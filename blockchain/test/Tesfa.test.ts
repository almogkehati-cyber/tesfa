import { expect } from "chai";
import { ethers } from "hardhat";
import { Tesfa } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Tesfa", function () {
  let tesfa: Tesfa;
  let owner: SignerWithAddress;
  let authorizedCaller: SignerWithAddress;
  let facilitator: SignerWithAddress;
  let personalAccount1: SignerWithAddress;
  let personalAccount2: SignerWithAddress;
  let businessAccount: SignerWithAddress;
  let inactiveAccount: SignerWithAddress;

  const WEEK = 7 * 24 * 60 * 60;
  const YEAR = 365 * 24 * 60 * 60;
  const FOUR_YEARS = 4 * YEAR;

  beforeEach(async function () {
    [owner, authorizedCaller, facilitator, personalAccount1, personalAccount2, businessAccount, inactiveAccount] = 
      await ethers.getSigners();

    const TesfaFactory = await ethers.getContractFactory("Tesfa");
    tesfa = await TesfaFactory.deploy();
    await tesfa.waitForDeployment();

    // Setup authorized caller and facilitator
    await tesfa.setAuthorizedCaller(authorizedCaller.address, true);
    await tesfa.setAuthorizedFacilitator(facilitator.address, true);
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await tesfa.name()).to.equal("Tesfa");
      expect(await tesfa.symbol()).to.equal("TSF");
    });

    it("Should set the correct max supply", async function () {
      expect(await tesfa.MAX_SUPPLY()).to.equal(ethers.parseEther("21000000"));
    });

    it("Should set the correct tax rate (1.5%)", async function () {
      expect(await tesfa.TAX_RATE()).to.equal(150);
    });

    it("Should have zero initial supply", async function () {
      expect(await tesfa.totalSupply()).to.equal(0);
    });

    it("Should have initial rate equal to BASE_RATE", async function () {
      expect(await tesfa.getCurrentRate()).to.equal(ethers.parseEther("1"));
    });
  });

  describe("Account Management", function () {
    it("Should register personal account", async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      expect(await tesfa.isPersonalAccount(personalAccount1.address)).to.be.true;
      expect(await tesfa.totalPersonalAccounts()).to.equal(1);
    });

    it("Should register business account", async function () {
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      expect(await tesfa.isBusinessAccount(businessAccount.address)).to.be.true;
    });

    it("Should not allow personal account to become business", async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await expect(
        tesfa.connect(authorizedCaller).registerBusinessAccount(personalAccount1.address)
      ).to.be.revertedWith("Already personal account");
    });

    it("Should not allow business account to become personal", async function () {
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      await expect(
        tesfa.connect(authorizedCaller).registerPersonalAccount(businessAccount.address)
      ).to.be.revertedWith("Already business account");
    });

    it("Should allow anyone to register personal account", async function () {
      // Personal accounts can be registered by anyone (self-registration)
      await tesfa.connect(personalAccount1).registerPersonalAccount(personalAccount2.address);
      expect(await tesfa.isPersonalAccount(personalAccount2.address)).to.be.true;
    });

    it("Should not allow unauthorized business registration", async function () {
      // Business accounts still require authorization
      await expect(
        tesfa.connect(personalAccount1).registerBusinessAccount(personalAccount2.address)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("TSF Creation (Transactions)", function () {
    beforeEach(async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
    });

    it("Should process transaction with correct distribution (60/40)", async function () {
      const paymentAmount = ethers.parseEther("100");
      
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        paymentAmount
      );

      // Total TSF = 100 (rate is 1:1 at start)
      // Tax = 1.5% = 1.5 TSF
      // After tax = 98.5 TSF
      // Buyer (60%) = 59.1 TSF
      // Seller (40%) = 39.4 TSF
      
      const buyerBalance = await tesfa.balanceOf(personalAccount1.address);
      const sellerBalance = await tesfa.balanceOf(businessAccount.address);
      
      // 60% of 98.5 = 59.1
      expect(buyerBalance).to.be.closeTo(ethers.parseEther("59.1"), ethers.parseEther("0.1"));
      // 40% of 98.5 = 39.4
      expect(sellerBalance).to.be.closeTo(ethers.parseEther("39.4"), ethers.parseEther("0.1"));
    });

    it("Should collect 1.5% tax to UBI pool", async function () {
      const paymentAmount = ethers.parseEther("1000");
      
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        paymentAmount
      );

      // Tax = 1.5% of 1000 = 15 TSF
      const ubiPool = await tesfa.ubiPool();
      expect(ubiPool).to.be.closeTo(ethers.parseEther("15"), ethers.parseEther("0.1"));
    });

    it("Should require seller to be business account", async function () {
      await expect(
        tesfa.connect(authorizedCaller).processTransaction(
          personalAccount1.address,
          personalAccount1.address, // Personal as seller - should fail
          ethers.parseEther("100")
        )
      ).to.be.revertedWith("Seller must be business");
    });

    it("Should decrease rate as supply increases", async function () {
      const initialRate = await tesfa.getCurrentRate();
      
      // Process large transaction
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        ethers.parseEther("1000000")
      );

      const newRate = await tesfa.getCurrentRate();
      expect(newRate).to.be.lt(initialRate);
    });
  });

  describe("Barter System", function () {
    beforeEach(async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount2.address);
    });

    it("Should record barter with 50/50 split", async function () {
      const estimatedValue = ethers.parseEther("100");
      
      await tesfa.connect(facilitator).recordBarter(
        personalAccount1.address,
        personalAccount2.address,
        estimatedValue,
        facilitator.address
      );

      // After 1.5% tax = 98.5 TSF
      // Each party gets 49.25 TSF
      const balance1 = await tesfa.balanceOf(personalAccount1.address);
      const balance2 = await tesfa.balanceOf(personalAccount2.address);
      
      expect(balance1).to.be.closeTo(ethers.parseEther("49.25"), ethers.parseEther("0.1"));
      expect(balance2).to.be.closeTo(ethers.parseEther("49.25"), ethers.parseEther("0.1"));
    });

    it("Should collect 1.5% tax from barter", async function () {
      await tesfa.connect(facilitator).recordBarter(
        personalAccount1.address,
        personalAccount2.address,
        ethers.parseEther("1000"),
        facilitator.address
      );

      const ubiPool = await tesfa.ubiPool();
      expect(ubiPool).to.be.closeTo(ethers.parseEther("15"), ethers.parseEther("0.1"));
    });

    it("Should only allow facilitator to record barter", async function () {
      await expect(
        tesfa.connect(personalAccount1).recordBarter(
          personalAccount1.address,
          personalAccount2.address,
          ethers.parseEther("100"),
          personalAccount1.address
        )
      ).to.be.revertedWith("Not facilitator");
    });
  });

  describe("Demurrage System", function () {
    beforeEach(async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      
      // Give personal account some TSF
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        ethers.parseEther("10000")
      );
    });

    it("Should calculate demurrage correctly for tier 2 (10-1000 TSF)", async function () {
      const balance = ethers.parseEther("500"); // 500 TSF
      const demurrage = await tesfa.calculateDemurrage(balance);
      
      // 490 TSF subject to 0.5%/year = 96 ppm/week
      // Demurrage = 490 * 96 / 1,000,000 ≈ 0.047 TSF
      expect(demurrage).to.be.gt(0);
    });

    it("Should not charge demurrage for balances under 10 TSF", async function () {
      const demurrage = await tesfa.calculateDemurrage(ethers.parseEther("9"));
      expect(demurrage).to.equal(0);
    });

    it("Should apply demurrage after one week", async function () {
      const balanceBefore = await tesfa.balanceOf(personalAccount1.address);
      
      // Fast forward one week
      await time.increase(WEEK);
      
      await tesfa.applyDemurrage(personalAccount1.address);
      
      const balanceAfter = await tesfa.balanceOf(personalAccount1.address);
      expect(balanceAfter).to.be.lt(balanceBefore);
    });

    it("Should transfer demurrage to UBI pool (not burn)", async function () {
      const ubiPoolBefore = await tesfa.ubiPool();
      
      await time.increase(WEEK);
      await tesfa.applyDemurrage(personalAccount1.address);
      
      const ubiPoolAfter = await tesfa.ubiPool();
      expect(ubiPoolAfter).to.be.gt(ubiPoolBefore);
    });

    it("Should not apply demurrage before one week", async function () {
      const balanceBefore = await tesfa.balanceOf(personalAccount1.address);
      
      // Fast forward 6 days
      await time.increase(6 * 24 * 60 * 60);
      
      await tesfa.applyDemurrage(personalAccount1.address);
      
      const balanceAfter = await tesfa.balanceOf(personalAccount1.address);
      expect(balanceAfter).to.equal(balanceBefore);
    });
  });

  describe("UBI Distribution", function () {
    beforeEach(async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount2.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      
      // Create UBI pool through transactions
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        ethers.parseEther("10000")
      );
    });

    it("Should distribute UBI equally to personal accounts", async function () {
      await tesfa.connect(authorizedCaller).distributeUBI();
      
      const claimable1 = await tesfa.getClaimableUBI(personalAccount1.address);
      const claimable2 = await tesfa.getClaimableUBI(personalAccount2.address);
      
      expect(claimable1).to.equal(claimable2);
      expect(claimable1).to.be.gt(0);
    });

    it("Should allow personal account to claim UBI", async function () {
      await tesfa.connect(authorizedCaller).distributeUBI();
      
      const balanceBefore = await tesfa.balanceOf(personalAccount2.address);
      await tesfa.connect(personalAccount2).claimUBI();
      const balanceAfter = await tesfa.balanceOf(personalAccount2.address);
      
      expect(balanceAfter).to.be.gt(balanceBefore);
    });

    it("Should not allow business account to claim UBI", async function () {
      await tesfa.connect(authorizedCaller).distributeUBI();
      
      await expect(
        tesfa.connect(businessAccount).claimUBI()
      ).to.be.revertedWith("Not personal account");
    });

    it("Should not allow double claiming", async function () {
      await tesfa.connect(authorizedCaller).distributeUBI();
      
      await tesfa.connect(personalAccount2).claimUBI();
      
      await expect(
        tesfa.connect(personalAccount2).claimUBI()
      ).to.be.revertedWith("No UBI to claim");
    });
  });

  describe("Inactive Account Recovery", function () {
    beforeEach(async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(inactiveAccount.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      
      // Give inactive account some TSF (under 1000)
      await tesfa.connect(authorizedCaller).processTransaction(
        inactiveAccount.address,
        businessAccount.address,
        ethers.parseEther("500")
      );
    });

    it("Should recover inactive account after 4 years", async function () {
      const balanceBefore = await tesfa.balanceOf(inactiveAccount.address);
      const ubiPoolBefore = await tesfa.ubiPool();
      
      // Fast forward 4 years
      await time.increase(FOUR_YEARS);
      
      await tesfa.connect(authorizedCaller).recoverInactiveAccount(inactiveAccount.address);
      
      const balanceAfter = await tesfa.balanceOf(inactiveAccount.address);
      const ubiPoolAfter = await tesfa.ubiPool();
      
      expect(balanceAfter).to.equal(0);
      expect(ubiPoolAfter).to.be.gt(ubiPoolBefore);
    });

    it("Should not recover active account", async function () {
      await expect(
        tesfa.connect(authorizedCaller).recoverInactiveAccount(inactiveAccount.address)
      ).to.be.revertedWith("Account still active");
    });

    it("Should not recover account with balance over 1000 TSF", async function () {
      // Give more TSF to exceed threshold
      await tesfa.connect(authorizedCaller).processTransaction(
        inactiveAccount.address,
        businessAccount.address,
        ethers.parseEther("2000")
      );
      
      await time.increase(FOUR_YEARS);
      
      await expect(
        tesfa.connect(authorizedCaller).recoverInactiveAccount(inactiveAccount.address)
      ).to.be.revertedWith("Balance out of range");
    });
  });

  describe("Rate Calculation", function () {
    it("Should return BASE_RATE when supply is 0", async function () {
      const rate = await tesfa.getCurrentRate();
      expect(rate).to.equal(ethers.parseEther("1"));
    });

    it("Should decrease rate as supply approaches MAX_SUPPLY", async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      
      // Process multiple large transactions
      for (let i = 0; i < 5; i++) {
        const rateBefore = await tesfa.getCurrentRate();
        
        await tesfa.connect(authorizedCaller).processTransaction(
          personalAccount1.address,
          businessAccount.address,
          ethers.parseEther("1000000")
        );
        
        const rateAfter = await tesfa.getCurrentRate();
        expect(rateAfter).to.be.lt(rateBefore);
      }
    });
  });

  describe("Access Control", function () {
    it("Should allow owner to set authorized caller", async function () {
      await tesfa.setAuthorizedCaller(personalAccount1.address, true);
      expect(await tesfa.authorizedCallers(personalAccount1.address)).to.be.true;
    });

    it("Should allow owner to set facilitator", async function () {
      await tesfa.setAuthorizedFacilitator(personalAccount1.address, true);
      expect(await tesfa.authorizedFacilitators(personalAccount1.address)).to.be.true;
    });

    it("Should not allow non-owner to set authorized caller", async function () {
      await expect(
        tesfa.connect(personalAccount1).setAuthorizedCaller(personalAccount2.address, true)
      ).to.be.reverted;
    });

    it("Should allow owner to pause/unpause", async function () {
      await tesfa.pause();
      
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      
      await expect(
        tesfa.connect(authorizedCaller).processTransaction(
          personalAccount1.address,
          businessAccount.address,
          ethers.parseEther("100")
        )
      ).to.be.reverted;
      
      await tesfa.unpause();
      
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        ethers.parseEther("100")
      );
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        ethers.parseEther("1000")
      );
    });

    it("Should return correct account info", async function () {
      const info = await tesfa.getAccountInfo(personalAccount1.address);
      
      expect(info.personal).to.be.true;
      expect(info.business).to.be.false;
      expect(info.balance).to.be.gt(0);
      expect(info.lastActivity).to.be.gt(0);
    });

    it("Should return correct system stats", async function () {
      const stats = await tesfa.getSystemStats();
      
      expect(stats.currentSupply).to.be.gt(0);
      expect(stats.maxSupply).to.equal(ethers.parseEther("21000000"));
      expect(stats.currentRate).to.be.gt(0);
      expect(stats.poolBalance).to.be.gt(0);
      expect(stats.personalAccounts).to.equal(1);
    });
  });

  describe("Transfer Activity Tracking", function () {
    beforeEach(async function () {
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount1.address);
      await tesfa.connect(authorizedCaller).registerPersonalAccount(personalAccount2.address);
      await tesfa.connect(authorizedCaller).registerBusinessAccount(businessAccount.address);
      
      await tesfa.connect(authorizedCaller).processTransaction(
        personalAccount1.address,
        businessAccount.address,
        ethers.parseEther("1000")
      );
    });

    it("Should update activity on transfer", async function () {
      const activityBefore = await tesfa.lastActivityTimestamp(personalAccount2.address);
      
      await tesfa.connect(personalAccount1).transfer(
        personalAccount2.address,
        ethers.parseEther("10")
      );
      
      const activityAfter = await tesfa.lastActivityTimestamp(personalAccount2.address);
      expect(activityAfter).to.be.gt(activityBefore);
    });
  });

  describe("Demurrage Tiers", function () {
    it("Should calculate correct demurrage for all tiers", async function () {
      // Tier 1: 0-10 TSF (0%)
      expect(await tesfa.calculateDemurrage(ethers.parseEther("5"))).to.equal(0);
      
      // Tier 2: 10-1000 TSF (0.5%/year = 96 ppm/week)
      const tier2Dem = await tesfa.calculateDemurrage(ethers.parseEther("500"));
      expect(tier2Dem).to.be.gt(0);
      
      // Tier 3: 1000-10000 TSF (1%/year = 192 ppm/week)
      const tier3Dem = await tesfa.calculateDemurrage(ethers.parseEther("5000"));
      expect(tier3Dem).to.be.gt(tier2Dem);
      
      // Tier 4: 10000-100000 TSF (2%/year = 385 ppm/week)
      const tier4Dem = await tesfa.calculateDemurrage(ethers.parseEther("50000"));
      expect(tier4Dem).to.be.gt(tier3Dem);
      
      // Tier 5: 100000-500000 TSF (5%/year = 962 ppm/week)
      const tier5Dem = await tesfa.calculateDemurrage(ethers.parseEther("200000"));
      expect(tier5Dem).to.be.gt(tier4Dem);
      
      // Tier 6: >500000 TSF (8%/year = 1538 ppm/week)
      const tier6Dem = await tesfa.calculateDemurrage(ethers.parseEther("1000000"));
      expect(tier6Dem).to.be.gt(tier5Dem);
    });
  });
});
