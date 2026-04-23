// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title Tesfa - Community Currency
 * @notice TSF is created ONLY from real economic activity:
 *         1. Purchase at authorized business (customer phone + business API)
 *         2. Barter through authorized third party
 *         Regular transfers do NOT create new TSF.
 * @dev Tax rate (1.5%) is IMMUTABLE - hardcoded forever.
 *      MAX_SUPPLY (21M) is IMMUTABLE - hardcoded forever.
 *      DAO manages community only, NOT code changes.
 */
contract Tesfa is ERC20, ReentrancyGuard {
    using Math for uint256;

    // ============ IMMUTABLE CONSTANTS - CANNOT BE CHANGED ============
    uint256 public constant MAX_SUPPLY = 21_000_000 * 1e18;
    uint256 public constant BASE_RATE = 1e16; // Base rate, scaled down as supply grows
    uint256 public constant TAX_RATE = 150; // 1.5% FOREVER - in basis points
    uint256 public constant BUYER_SHARE = 60; // 60% to buyer
    uint256 public constant SELLER_SHARE = 40; // 40% to seller
    uint256 public constant BARTER_SHARE = 50; // 50/50 split in barter

    uint256 public constant DEMURRAGE_INTERVAL = 7 days;
    uint256 public constant INACTIVE_PERIOD = 4 * 365 days;
    uint256 public constant INACTIVE_THRESHOLD = 1000 * 1e18;

    // ============ STATE ============
    uint256 public ubiPool;
    uint256 public totalRegistered;
    bool public capReached;

    // User registration
    mapping(address => bool) public isRegistered;
    mapping(address => uint256) public lastActivity;
    mapping(address => uint256) public lastDemurrageTime;

    // Account types - mutually exclusive
    mapping(address => bool) public isPersonalAccount;
    mapping(address => bool) public isBusinessAccount;

    // Phone → Wallet mapping (phone stored as keccak256 hash)
    mapping(bytes32 => address) public phoneToWallet;
    mapping(address => bytes32) public walletToPhone;

    // Pending TSF for unregistered phones
    mapping(bytes32 => uint256) public pendingTSF;

    // Authorized businesses (have API keys)
    mapping(address => bool) public authorizedBusinesses;
    
    // Authorized barter facilitators (our platform, authorized businesses)
    mapping(address => bool) public authorizedBarterFacilitators;

    // Platform admin (only for adding businesses, NOT for changing rules)
    address public immutable platformAdmin;

    // ============ EVENTS ============
    event Registered(address indexed user, bytes32 indexed phoneHash);
    event PhoneLinked(address indexed user, bytes32 indexed phoneHash);
    event PendingTSFClaimed(address indexed user, bytes32 indexed phoneHash, uint256 amount);
    event TSFMintedFromPurchase(bytes32 indexed buyerPhone, address indexed business, uint256 buyerAmount, uint256 sellerAmount);
    event TSFMintedFromBarter(bytes32 indexed partyA, bytes32 indexed partyB, uint256 amountEach);
    event PendingTSFCreated(bytes32 indexed phoneHash, uint256 amount);
    event TaxCollected(uint256 amount);
    event UBIClaimed(address indexed user, uint256 amount);
    event DemurrageCollected(address indexed hunter, address indexed target, uint256 burned, uint256 hunterReward, uint256 toPool);
    event InactiveRecovered(address indexed user, uint256 amount);
    event BusinessAuthorized(address indexed business);
    event BusinessRevoked(address indexed business);
    event BarterFacilitatorAuthorized(address indexed facilitator);
    event BarterFacilitatorRevoked(address indexed facilitator);
    event PersonalAccountCreated(address indexed user);
    event BusinessAccountCreated(address indexed business);

    // ============ MODIFIERS ============
    modifier onlyBusiness() {
        require(authorizedBusinesses[msg.sender], "TSF: not authorized business");
        require(isBusinessAccount[msg.sender], "TSF: not business account");
        _;
    }

    modifier onlyPersonal() {
        require(isPersonalAccount[msg.sender], "TSF: not personal account");
        _;
    }

    modifier onlyBarterFacilitator() {
        require(authorizedBarterFacilitators[msg.sender], "TSF: not authorized facilitator");
        _;
    }

    modifier onlyPlatformAdmin() {
        require(msg.sender == platformAdmin, "TSF: not platform admin");
        _;
    }

    constructor(address _platformAdmin) ERC20("Tesfa", "TSF") {
        require(_platformAdmin != address(0), "TSF: zero admin");
        platformAdmin = _platformAdmin;
        // Platform is also a barter facilitator
        authorizedBarterFacilitators[_platformAdmin] = true;
        emit BarterFacilitatorAuthorized(_platformAdmin);
    }

    function _syncCap() internal {
        if (!capReached && totalSupply() >= MAX_SUPPLY) {
            capReached = true;
            ubiPool = 0;
        }
    }

    // ============ ADMIN FUNCTIONS (only for adding businesses) ============
    
    function authorizeBusiness(address business) external onlyPlatformAdmin {
        require(business != address(0), "TSF: zero address");
        require(!isPersonalAccount[business], "TSF: already personal account");
        
        authorizedBusinesses[business] = true;
        isBusinessAccount[business] = true;
        isRegistered[business] = true;
        lastActivity[business] = block.timestamp;
        lastDemurrageTime[business] = block.timestamp;
        
        emit BusinessAuthorized(business);
        emit BusinessAccountCreated(business);
    }

    function revokeBusiness(address business) external onlyPlatformAdmin {
        authorizedBusinesses[business] = false;
        // Note: isBusinessAccount remains true - account type doesn't change
        emit BusinessRevoked(business);
    }

    function authorizeBarterFacilitator(address facilitator) external onlyPlatformAdmin {
        require(facilitator != address(0), "TSF: zero address");
        authorizedBarterFacilitators[facilitator] = true;
        emit BarterFacilitatorAuthorized(facilitator);
    }

    function revokeBarterFacilitator(address facilitator) external onlyPlatformAdmin {
        authorizedBarterFacilitators[facilitator] = false;
        emit BarterFacilitatorRevoked(facilitator);
    }

    // ============ USER REGISTRATION ============

    /**
     * @notice Register user with their phone number
     * @param phoneHash keccak256 hash of normalized phone number
     */
    function register(bytes32 phoneHash) external {
        require(msg.sender != address(0), "TSF: zero address");
        require(!isRegistered[msg.sender], "TSF: already registered");
        require(!isBusinessAccount[msg.sender], "TSF: business cannot register as personal");
        require(phoneHash != bytes32(0), "TSF: empty phone");
        require(phoneToWallet[phoneHash] == address(0), "TSF: phone already linked");

        isRegistered[msg.sender] = true;
        isPersonalAccount[msg.sender] = true;
        lastActivity[msg.sender] = block.timestamp;
        lastDemurrageTime[msg.sender] = block.timestamp;
        totalRegistered += 1;
        
        emit PersonalAccountCreated(msg.sender);

        // Link phone to wallet
        phoneToWallet[phoneHash] = msg.sender;
        walletToPhone[msg.sender] = phoneHash;

        emit Registered(msg.sender, phoneHash);
        emit PhoneLinked(msg.sender, phoneHash);

        // Claim any pending TSF
        uint256 pending = pendingTSF[phoneHash];
        if (pending > 0) {
            pendingTSF[phoneHash] = 0;
            _mintWithCap(msg.sender, pending);
            emit PendingTSFClaimed(msg.sender, phoneHash, pending);
        }
    }

    // ============ TSF CREATION: PURCHASE AT BUSINESS ============

    /**
     * @notice Business records a purchase - TSF created for buyer
     * @param buyerPhoneHash keccak256 hash of buyer's phone number
     * @param amountILS Purchase amount in ILS (scaled by 100, e.g., 10000 = 100 ILS)
     * @dev Called by authorized business via API
     *      If buyer has no wallet yet, TSF is saved as pending
     */
    function recordPurchase(bytes32 buyerPhoneHash, uint256 amountILS) external nonReentrant onlyBusiness {
        require(buyerPhoneHash != bytes32(0), "TSF: empty phone");
        require(amountILS > 0, "TSF: zero amount");

        if (capReached) return; // No new minting after cap

        uint256 S = totalSupply();
        if (S >= MAX_SUPPLY) {
            _syncCap();
            return;
        }

        // Calculate mint amount with decreasing rate
        uint256 rate = (BASE_RATE * (MAX_SUPPLY - S)) / MAX_SUPPLY;
        uint256 totalMint = Math.mulDiv(amountILS, rate, 100);
        if (totalMint == 0) return;

        // Respect max supply
        uint256 remaining = MAX_SUPPLY - S;
        if (totalMint > remaining) totalMint = remaining;

        // Tax goes to UBI pool
        uint256 tax = Math.mulDiv(totalMint, TAX_RATE, 10_000);
        ubiPool += tax;
        emit TaxCollected(tax);

        uint256 net = totalMint - tax;
        uint256 buyerAmount = (net * BUYER_SHARE) / 100;
        uint256 sellerAmount = net - buyerAmount; // Business gets the rest

        // Mint to business (seller)
        _mint(msg.sender, sellerAmount);
        lastActivity[msg.sender] = block.timestamp;

        // Handle buyer - wallet or pending
        address buyerWallet = phoneToWallet[buyerPhoneHash];
        if (buyerWallet != address(0)) {
            // Buyer has wallet - mint directly
            _mint(buyerWallet, buyerAmount);
            lastActivity[buyerWallet] = block.timestamp;
        } else {
            // Buyer not registered - save as pending
            pendingTSF[buyerPhoneHash] += buyerAmount;
            emit PendingTSFCreated(buyerPhoneHash, buyerAmount);
        }

        _syncCap();
        emit TSFMintedFromPurchase(buyerPhoneHash, msg.sender, buyerAmount, sellerAmount);
    }

    // ============ TSF CREATION: BARTER ============

    /**
     * @notice Record a barter transaction - TSF created 50/50 for both parties
     * @param partyAPhone keccak256 hash of party A's phone
     * @param partyBPhone keccak256 hash of party B's phone  
     * @param valueILS Agreed value in ILS (scaled by 100)
     * @dev Called ONLY by authorized barter facilitator (our platform or authorized business)
     *      Direct barter between two people is NOT possible - must go through facilitator
     */
    function recordBarter(bytes32 partyAPhone, bytes32 partyBPhone, uint256 valueILS) external nonReentrant onlyBarterFacilitator {
        require(partyAPhone != bytes32(0) && partyBPhone != bytes32(0), "TSF: empty phone");
        require(partyAPhone != partyBPhone, "TSF: same party");
        require(valueILS > 0, "TSF: zero value");

        if (capReached) return;

        uint256 S = totalSupply();
        if (S >= MAX_SUPPLY) {
            _syncCap();
            return;
        }

        // Calculate mint amount with decreasing rate
        uint256 rate = (BASE_RATE * (MAX_SUPPLY - S)) / MAX_SUPPLY;
        uint256 totalMint = Math.mulDiv(valueILS, rate, 100);
        if (totalMint == 0) return;

        uint256 remaining = MAX_SUPPLY - S;
        if (totalMint > remaining) totalMint = remaining;

        // Tax
        uint256 tax = Math.mulDiv(totalMint, TAX_RATE, 10_000);
        ubiPool += tax;
        emit TaxCollected(tax);

        // Split 50/50
        uint256 net = totalMint - tax;
        uint256 eachAmount = net / 2;

        // Handle party A
        address walletA = phoneToWallet[partyAPhone];
        if (walletA != address(0)) {
            _mint(walletA, eachAmount);
            lastActivity[walletA] = block.timestamp;
        } else {
            pendingTSF[partyAPhone] += eachAmount;
            emit PendingTSFCreated(partyAPhone, eachAmount);
        }

        // Handle party B
        address walletB = phoneToWallet[partyBPhone];
        if (walletB != address(0)) {
            _mint(walletB, eachAmount);
            lastActivity[walletB] = block.timestamp;
        } else {
            pendingTSF[partyBPhone] += eachAmount;
            emit PendingTSFCreated(partyBPhone, eachAmount);
        }

        _syncCap();
        emit TSFMintedFromBarter(partyAPhone, partyBPhone, eachAmount);
    }

    // ============ HELPER: MINT WITH CAP ============

    function _mintWithCap(address to, uint256 amount) internal {
        uint256 S = totalSupply();
        if (S >= MAX_SUPPLY) {
            _syncCap();
            return;
        }
        uint256 remaining = MAX_SUPPLY - S;
        uint256 toMint = amount > remaining ? remaining : amount;
        if (toMint > 0) {
            _mint(to, toMint);
            _syncCap();
        }
    }

    function claimUBI() external nonReentrant onlyPersonal {
        require(isRegistered[msg.sender], "TSF: not registered");
        require(ubiPool > 0, "TSF: pool empty");
        require(totalRegistered > 0, "TSF: no users");

        uint256 share = ubiPool / totalRegistered;
        require(share > 0, "TSF: share zero");

        if (capReached) {
            require(balanceOf(address(this)) >= share, "TSF: pool balance");
            ubiPool -= share;
            _transfer(address(this), msg.sender, share);
        } else {
            uint256 S = totalSupply();
            require(S < MAX_SUPPLY, "TSF: max supply");

            uint256 remaining = MAX_SUPPLY - S;
            if (share > remaining) {
                share = remaining;
            }

            ubiPool -= share;
            _mint(msg.sender, share);
            _syncCap();
        }
        lastActivity[msg.sender] = block.timestamp;

        emit UBIClaimed(msg.sender, share);
    }

    function collectDemurrage(address target) external nonReentrant {
        require(isRegistered[msg.sender], "TSF: hunter not registered");
        require(isRegistered[target], "TSF: target not registered");
        require(block.timestamp >= lastDemurrageTime[target] + DEMURRAGE_INTERVAL, "TSF: not due");

        lastDemurrageTime[target] = block.timestamp;

        uint256 bal = balanceOf(target);
        uint256 dem = _demurrageAmount(bal);
        if (dem == 0) return;

        if (capReached) {
            // Post-cap mode: no minting/burning; demurrage is redistributed into pool and hunter.
            _transfer(target, address(this), dem);
            uint256 hunterAmt = (dem * 10) / 100;
            uint256 toPool = dem - hunterAmt;
            if (hunterAmt > 0) {
                _transfer(address(this), msg.sender, hunterAmt);
            }
            ubiPool += toPool;
            emit DemurrageCollected(msg.sender, target, dem, hunterAmt, toPool);
        } else {
            _burn(target, dem);

            uint256 hunterMint = (dem * 10) / 100;
            uint256 toPool = dem - hunterMint;

            uint256 S = totalSupply();
            if (hunterMint > 0 && S < MAX_SUPPLY) {
                uint256 remaining = MAX_SUPPLY - S;
                if (hunterMint > remaining) hunterMint = remaining;
                if (hunterMint > 0) {
                    _mint(msg.sender, hunterMint);
                }
            }

            ubiPool += toPool;
            _syncCap();
            emit DemurrageCollected(msg.sender, target, dem, hunterMint, toPool);
        }
    }

    function recoverInactive(address user) external nonReentrant {
        require(isRegistered[user], "TSF: not registered");
        require(block.timestamp >= lastActivity[user] + INACTIVE_PERIOD, "TSF: still active");

        uint256 bal = balanceOf(user);
        require(bal > 0, "TSF: empty");
        require(bal <= INACTIVE_THRESHOLD, "TSF: above threshold");

        _burn(user, bal);
        ubiPool += bal;
        lastActivity[user] = block.timestamp;

        emit InactiveRecovered(user, bal);
    }

    function _demurrageAmount(uint256 bal) internal pure returns (uint256) {
        // 0-10 TSF: 0%
        if (bal <= 10 * 1e18) return 0;

        uint256 dem;
        // 10-100: 19 ppm/week
        dem += _tierDem(bal, 10, 100, 19);
        // 100-1,000: 38 ppm/week
        dem += _tierDem(bal, 100, 1000, 38);
        // 1,000-10,000: 77 ppm/week
        dem += _tierDem(bal, 1000, 10_000, 77);
        // 10,000-100,000: 135 ppm/week
        dem += _tierDem(bal, 10_000, 100_000, 135);
        // >100,000: 192 ppm/week
        dem += _tierDemAbove(bal, 100_000, 192);

        return dem;
    }

    function _tierDem(uint256 bal, uint256 fromTsf, uint256 toTsf, uint256 ppmPerWeek) internal pure returns (uint256) {
        uint256 fromWei = fromTsf * 1e18;
        if (bal <= fromWei) return 0;

        uint256 toWei = toTsf * 1e18;
        uint256 upper = bal < toWei ? bal : toWei;
        if (upper <= fromWei) return 0;

        uint256 slice = upper - fromWei;
        return Math.mulDiv(slice, ppmPerWeek, 1_000_000);
    }

    function _tierDemAbove(uint256 bal, uint256 fromTsf, uint256 ppmPerWeek) internal pure returns (uint256) {
        uint256 fromWei = fromTsf * 1e18;
        if (bal <= fromWei) return 0;
        uint256 slice = bal - fromWei;
        return Math.mulDiv(slice, ppmPerWeek, 1_000_000);
    }
}
