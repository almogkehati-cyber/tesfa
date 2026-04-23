// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title Tesfa - Community Currency with UBI Distribution
 * @notice A community-based currency with progressive demurrage and UBI distribution
 * @dev Implements ERC20 with custom minting logic, demurrage, and UBI pool
 */
contract Tesfa is ERC20, Ownable, ReentrancyGuard, Pausable {
    // ============ Constants ============
    uint256 public constant MAX_SUPPLY = 21_000_000 * 1e18;
    uint256 public constant BASE_RATE = 1e18; // 1 TSF per unit
    uint256 public constant TAX_RATE = 150; // 1.5% = 150 basis points
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant WEEK = 7 days;
    uint256 public constant INACTIVITY_PERIOD = 4 * 365 days; // 4 years
    uint256 public constant INACTIVE_THRESHOLD = 1000 * 1e18; // 1,000 TSF

    // Demurrage rates in parts per million (ppm) per week
    uint256 public constant DEMURRAGE_TIER_1_MAX = 10 * 1e18;        // 0-10 TSF: 0%
    uint256 public constant DEMURRAGE_TIER_2_MAX = 1000 * 1e18;      // 10-1,000 TSF: 0.5%/year
    uint256 public constant DEMURRAGE_TIER_3_MAX = 10000 * 1e18;     // 1,000-10,000 TSF: 1%/year
    uint256 public constant DEMURRAGE_TIER_4_MAX = 100000 * 1e18;    // 10,000-100,000 TSF: 2%/year
    uint256 public constant DEMURRAGE_TIER_5_MAX = 500000 * 1e18;    // 100,000-500,000 TSF: 5%/year

    uint256 public constant DEMURRAGE_RATE_TIER_2 = 96;    // 0.5%/year ≈ 96 ppm/week
    uint256 public constant DEMURRAGE_RATE_TIER_3 = 192;   // 1%/year ≈ 192 ppm/week
    uint256 public constant DEMURRAGE_RATE_TIER_4 = 385;   // 2%/year ≈ 385 ppm/week
    uint256 public constant DEMURRAGE_RATE_TIER_5 = 962;   // 5%/year ≈ 962 ppm/week
    uint256 public constant DEMURRAGE_RATE_TIER_6 = 1538;  // 8%/year ≈ 1538 ppm/week
    uint256 public constant PPM = 1_000_000;

    // ============ State Variables ============
    uint256 public ubiPool;
    uint256 public totalPersonalAccounts;
    uint256 public lastDemurrageTimestamp;
    uint256 public lastUBIDistributionTimestamp;

    // Account mappings
    mapping(address => bool) public isPersonalAccount;
    mapping(address => bool) public isBusinessAccount;
    mapping(address => bool) public authorizedCallers;
    mapping(address => bool) public authorizedFacilitators;
    
    // Activity tracking
    mapping(address => uint256) public lastActivityTimestamp;
    mapping(address => uint256) public lastDemurrageApplied;
    
    // UBI tracking
    mapping(address => uint256) public ubiClaimed;
    uint256 public totalUBIDistributed;
    uint256 public ubiPerAccountAccumulated;

    // ============ Events ============
    event AccountRegistered(address indexed account, bool isPersonal, bool isBusiness);
    event AuthorizedCallerSet(address indexed caller, bool authorized);
    event AuthorizedFacilitatorSet(address indexed facilitator, bool authorized);
    event TransactionProcessed(
        address indexed buyer,
        address indexed seller,
        uint256 paymentAmount,
        uint256 buyerMinted,
        uint256 sellerMinted,
        uint256 taxCollected
    );
    event BarterRecorded(
        address indexed party1,
        address indexed party2,
        uint256 estimatedValue,
        address indexed facilitator,
        uint256 party1Minted,
        uint256 party2Minted,
        uint256 taxCollected
    );
    event DemurrageApplied(address indexed account, uint256 amount, uint256 newBalance);
    event UBIClaimed(address indexed account, uint256 amount);
    event UBIPoolFunded(uint256 amount, string source);
    event InactiveAccountRecovered(address indexed account, uint256 amount);

    // ============ Modifiers ============
    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    modifier onlyFacilitator() {
        require(authorizedFacilitators[msg.sender] || msg.sender == owner(), "Not facilitator");
        _;
    }

    modifier validAccount(address account) {
        require(account != address(0), "Invalid address");
        require(isPersonalAccount[account] || isBusinessAccount[account], "Account not registered");
        _;
    }

    // ============ Constructor ============
    constructor() ERC20("Tesfa", "TSF") Ownable(msg.sender) {
        lastDemurrageTimestamp = block.timestamp;
        lastUBIDistributionTimestamp = block.timestamp;
    }

    // ============ Account Management ============
    
    /**
     * @notice Register a personal account (receives UBI, cannot mint)
     * @dev Anyone can call this to register themselves or others
     * @param account Address to register
     */
    function registerPersonalAccount(address account) external {
        require(account != address(0), "Invalid address");
        require(!isBusinessAccount[account], "Already business account");
        require(!isPersonalAccount[account], "Already registered");

        isPersonalAccount[account] = true;
        totalPersonalAccounts++;
        lastActivityTimestamp[account] = block.timestamp;
        lastDemurrageApplied[account] = block.timestamp;

        emit AccountRegistered(account, true, false);
    }

    /**
     * @notice Register a business account (can mint, does not receive UBI)
     * @param account Address to register
     */
    function registerBusinessAccount(address account) external onlyAuthorized {
        require(account != address(0), "Invalid address");
        require(!isPersonalAccount[account], "Already personal account");
        require(!isBusinessAccount[account], "Already registered");

        isBusinessAccount[account] = true;
        lastActivityTimestamp[account] = block.timestamp;
        lastDemurrageApplied[account] = block.timestamp;

        emit AccountRegistered(account, false, true);
    }

    /**
     * @notice Set authorized caller status
     * @param caller Address to authorize/deauthorize
     * @param authorized Authorization status
     */
    function setAuthorizedCaller(address caller, bool authorized) external onlyOwner {
        authorizedCallers[caller] = authorized;
        emit AuthorizedCallerSet(caller, authorized);
    }

    /**
     * @notice Set authorized facilitator status for barter transactions
     * @param facilitator Address to authorize/deauthorize
     * @param authorized Authorization status
     */
    function setAuthorizedFacilitator(address facilitator, bool authorized) external onlyOwner {
        authorizedFacilitators[facilitator] = authorized;
        emit AuthorizedFacilitatorSet(facilitator, authorized);
    }

    // ============ TSF Creation (Transactions) ============

    /**
     * @notice Calculate the current minting rate based on supply
     * @return rate Current rate (scaled by 1e18)
     */
    function getCurrentRate() public view returns (uint256) {
        uint256 currentSupply = totalSupply();
        if (currentSupply >= MAX_SUPPLY) {
            return 0;
        }
        // rate = BASE_RATE × (1 - S / MAX_SUPPLY)
        uint256 supplyRatio = (currentSupply * 1e18) / MAX_SUPPLY;
        return (BASE_RATE * (1e18 - supplyRatio)) / 1e18;
    }

    /**
     * @notice Process a transaction between buyer and seller
     * @param buyer Address of the buyer (receives 60% TSF)
     * @param seller Address of the seller (receives 40% TSF)
     * @param paymentAmount Amount of external payment (used for TSF calculation)
     */
    function processTransaction(
        address buyer,
        address seller,
        uint256 paymentAmount
    ) external onlyAuthorized nonReentrant whenNotPaused validAccount(buyer) validAccount(seller) {
        require(paymentAmount > 0, "Amount must be positive");
        require(isBusinessAccount[seller], "Seller must be business");

        // Calculate TSF to mint based on current rate
        uint256 rate = getCurrentRate();
        require(rate > 0, "Max supply reached");

        uint256 totalTSF = (paymentAmount * rate) / 1e18;
        
        // Check supply cap
        require(totalSupply() + totalTSF <= MAX_SUPPLY, "Exceeds max supply");

        // Calculate distributions
        uint256 tax = (totalTSF * TAX_RATE) / BASIS_POINTS; // 1.5% tax
        uint256 afterTax = totalTSF - tax;
        uint256 buyerAmount = (afterTax * 60) / 100;  // 60% to buyer
        uint256 sellerAmount = afterTax - buyerAmount; // 40% to seller

        // Mint tokens
        _mint(buyer, buyerAmount);
        _mint(seller, sellerAmount);
        
        // Add tax to UBI pool
        ubiPool += tax;
        _mint(address(this), tax);

        // Update activity
        lastActivityTimestamp[buyer] = block.timestamp;
        lastActivityTimestamp[seller] = block.timestamp;

        emit TransactionProcessed(buyer, seller, paymentAmount, buyerAmount, sellerAmount, tax);
        emit UBIPoolFunded(tax, "transaction_tax");
    }

    // ============ Barter System ============

    /**
     * @notice Record a barter transaction between two parties
     * @param party1 First party in the barter
     * @param party2 Second party in the barter
     * @param estimatedValue Estimated value of the barter
     * @param facilitator Address of the facilitator
     */
    function recordBarter(
        address party1,
        address party2,
        uint256 estimatedValue,
        address facilitator
    ) external onlyFacilitator nonReentrant whenNotPaused {
        require(party1 != address(0) && party2 != address(0), "Invalid addresses");
        require(isPersonalAccount[party1] || isBusinessAccount[party1], "Party1 not registered");
        require(isPersonalAccount[party2] || isBusinessAccount[party2], "Party2 not registered");
        require(estimatedValue > 0, "Value must be positive");
        require(facilitator == msg.sender, "Facilitator mismatch");

        // Calculate TSF based on current rate
        uint256 rate = getCurrentRate();
        require(rate > 0, "Max supply reached");

        uint256 totalTSF = (estimatedValue * rate) / 1e18;
        require(totalSupply() + totalTSF <= MAX_SUPPLY, "Exceeds max supply");

        // Calculate distributions (50/50 split)
        uint256 tax = (totalTSF * TAX_RATE) / BASIS_POINTS; // 1.5% tax
        uint256 afterTax = totalTSF - tax;
        uint256 partyAmount = afterTax / 2; // 50% each

        // Mint tokens
        _mint(party1, partyAmount);
        _mint(party2, afterTax - partyAmount); // Handle odd amounts
        
        // Add tax to UBI pool
        ubiPool += tax;
        _mint(address(this), tax);

        // Update activity
        lastActivityTimestamp[party1] = block.timestamp;
        lastActivityTimestamp[party2] = block.timestamp;

        emit BarterRecorded(party1, party2, estimatedValue, facilitator, partyAmount, afterTax - partyAmount, tax);
        emit UBIPoolFunded(tax, "barter_tax");
    }

    // ============ Demurrage System ============

    /**
     * @notice Calculate demurrage for a given balance
     * @param balance The balance to calculate demurrage for
     * @return demurrage The demurrage amount
     */
    function calculateDemurrage(uint256 balance) public pure returns (uint256) {
        if (balance <= DEMURRAGE_TIER_1_MAX) {
            return 0; // 0% for 0-10 TSF
        }

        uint256 demurrage = 0;
        uint256 remaining = balance;

        // Tier 6: > 500,000 TSF (8%/year)
        if (remaining > DEMURRAGE_TIER_5_MAX) {
            uint256 tierAmount = remaining - DEMURRAGE_TIER_5_MAX;
            demurrage += (tierAmount * DEMURRAGE_RATE_TIER_6) / PPM;
            remaining = DEMURRAGE_TIER_5_MAX;
        }

        // Tier 5: 100,000-500,000 TSF (5%/year)
        if (remaining > DEMURRAGE_TIER_4_MAX) {
            uint256 tierAmount = remaining - DEMURRAGE_TIER_4_MAX;
            demurrage += (tierAmount * DEMURRAGE_RATE_TIER_5) / PPM;
            remaining = DEMURRAGE_TIER_4_MAX;
        }

        // Tier 4: 10,000-100,000 TSF (2%/year)
        if (remaining > DEMURRAGE_TIER_3_MAX) {
            uint256 tierAmount = remaining - DEMURRAGE_TIER_3_MAX;
            demurrage += (tierAmount * DEMURRAGE_RATE_TIER_4) / PPM;
            remaining = DEMURRAGE_TIER_3_MAX;
        }

        // Tier 3: 1,000-10,000 TSF (1%/year)
        if (remaining > DEMURRAGE_TIER_2_MAX) {
            uint256 tierAmount = remaining - DEMURRAGE_TIER_2_MAX;
            demurrage += (tierAmount * DEMURRAGE_RATE_TIER_3) / PPM;
            remaining = DEMURRAGE_TIER_2_MAX;
        }

        // Tier 2: 10-1,000 TSF (0.5%/year)
        if (remaining > DEMURRAGE_TIER_1_MAX) {
            uint256 tierAmount = remaining - DEMURRAGE_TIER_1_MAX;
            demurrage += (tierAmount * DEMURRAGE_RATE_TIER_2) / PPM;
        }

        return demurrage;
    }

    /**
     * @notice Apply demurrage to a specific account
     * @param account Address to apply demurrage to
     */
    function applyDemurrage(address account) public nonReentrant {
        _applyDemurrageInternal(account);
    }

    /**
     * @dev Internal demurrage logic (no reentrancy guard for internal calls)
     */
    function _applyDemurrageInternal(address account) internal {
        if (!isPersonalAccount[account] && !isBusinessAccount[account]) {
            return;
        }
        
        uint256 timeSinceLast = block.timestamp - lastDemurrageApplied[account];
        if (timeSinceLast < WEEK) {
            return; // Not a full week yet
        }

        uint256 balance = balanceOf(account);
        if (balance == 0) {
            lastDemurrageApplied[account] = block.timestamp;
            return;
        }

        uint256 weeksElapsed = timeSinceLast / WEEK;
        uint256 totalDemurrage = 0;

        for (uint256 i = 0; i < weeksElapsed; i++) {
            uint256 weeklyDemurrage = calculateDemurrage(balance - totalDemurrage);
            totalDemurrage += weeklyDemurrage;
            
            // Prevent demurrage from exceeding balance
            if (totalDemurrage >= balance) {
                totalDemurrage = balance;
                break;
            }
        }

        if (totalDemurrage > 0) {
            // Transfer demurrage to UBI pool (no burning!)
            _transfer(account, address(this), totalDemurrage);
            ubiPool += totalDemurrage;
            
            emit DemurrageApplied(account, totalDemurrage, balanceOf(account));
            emit UBIPoolFunded(totalDemurrage, "demurrage");
        }

        lastDemurrageApplied[account] = block.timestamp;
    }

    /**
     * @notice Batch apply demurrage to multiple accounts
     * @param accounts Array of addresses to apply demurrage to
     */
    function batchApplyDemurrage(address[] calldata accounts) external {
        for (uint256 i = 0; i < accounts.length; i++) {
            applyDemurrage(accounts[i]);
        }
    }

    // ============ UBI Distribution ============

    /**
     * @notice Claim UBI allocation for a personal account
     */
    function claimUBI() external nonReentrant whenNotPaused {
        require(isPersonalAccount[msg.sender], "Not personal account");
        require(totalPersonalAccounts > 0, "No personal accounts");

        // Apply any pending demurrage first
        _applyDemurrageInternal(msg.sender);

        // Calculate claimable UBI
        uint256 claimable = getClaimableUBI(msg.sender);
        require(claimable > 0, "No UBI to claim");

        // Update claimed amount
        ubiClaimed[msg.sender] = ubiPerAccountAccumulated;
        
        // Transfer UBI
        require(balanceOf(address(this)) >= claimable, "Insufficient UBI pool");
        _transfer(address(this), msg.sender, claimable);
        ubiPool -= claimable;
        totalUBIDistributed += claimable;

        // Update activity
        lastActivityTimestamp[msg.sender] = block.timestamp;

        emit UBIClaimed(msg.sender, claimable);
    }

    /**
     * @notice Get claimable UBI for an account
     * @param account Address to check
     * @return Claimable UBI amount
     */
    function getClaimableUBI(address account) public view returns (uint256) {
        if (!isPersonalAccount[account]) {
            return 0;
        }
        
        uint256 accumulated = ubiPerAccountAccumulated - ubiClaimed[account];
        return accumulated;
    }

    /**
     * @notice Distribute UBI pool equally to all personal accounts
     * @dev Should be called periodically (e.g., weekly)
     */
    function distributeUBI() external onlyAuthorized {
        require(totalPersonalAccounts > 0, "No personal accounts");
        require(ubiPool > 0, "UBI pool empty");

        uint256 perAccount = ubiPool / totalPersonalAccounts;
        ubiPerAccountAccumulated += perAccount;
        
        lastUBIDistributionTimestamp = block.timestamp;
    }

    // ============ Inactive Account Recovery ============

    /**
     * @notice Recover funds from inactive accounts
     * @param account Address to check and recover from
     */
    function recoverInactiveAccount(address account) external onlyAuthorized nonReentrant {
        require(isPersonalAccount[account] || isBusinessAccount[account], "Not registered");
        
        uint256 inactiveTime = block.timestamp - lastActivityTimestamp[account];
        require(inactiveTime >= INACTIVITY_PERIOD, "Account still active");
        
        uint256 balance = balanceOf(account);
        require(balance > 0 && balance < INACTIVE_THRESHOLD, "Balance out of range");

        // Transfer to UBI pool
        _transfer(account, address(this), balance);
        ubiPool += balance;

        emit InactiveAccountRecovered(account, balance);
        emit UBIPoolFunded(balance, "inactive_recovery");
    }

    // ============ View Functions ============

    /**
     * @notice Get account info
     * @param account Address to query
     */
    function getAccountInfo(address account) external view returns (
        bool personal,
        bool business,
        uint256 balance,
        uint256 lastActivity,
        uint256 pendingDemurrage,
        uint256 claimableUBI
    ) {
        personal = isPersonalAccount[account];
        business = isBusinessAccount[account];
        balance = balanceOf(account);
        lastActivity = lastActivityTimestamp[account];
        pendingDemurrage = calculateDemurrage(balance);
        claimableUBI = getClaimableUBI(account);
    }

    /**
     * @notice Get system stats
     */
    function getSystemStats() external view returns (
        uint256 currentSupply,
        uint256 maxSupply,
        uint256 currentRate,
        uint256 poolBalance,
        uint256 personalAccounts,
        uint256 distributedUBI
    ) {
        currentSupply = totalSupply();
        maxSupply = MAX_SUPPLY;
        currentRate = getCurrentRate();
        poolBalance = ubiPool;
        personalAccounts = totalPersonalAccounts;
        distributedUBI = totalUBIDistributed;
    }

    // ============ Admin Functions ============

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // ============ Override Functions ============

    /**
     * @notice Override transfer to update activity and check registration
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        lastActivityTimestamp[msg.sender] = block.timestamp;
        if (to != address(this)) {
            lastActivityTimestamp[to] = block.timestamp;
        }
        return super.transfer(to, amount);
    }

    /**
     * @notice Override transferFrom to update activity
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        lastActivityTimestamp[from] = block.timestamp;
        if (to != address(this)) {
            lastActivityTimestamp[to] = block.timestamp;
        }
        return super.transferFrom(from, to, amount);
    }
}
