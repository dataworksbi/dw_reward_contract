const RewardPoint = artifacts.require("RewardPoint");

contract('RewardPoint', (accounts) => {
    it('should mint 100 RewardPoint in the first account', async() => {
        const rewardPointInstance = await RewardPoint.deployed();
        const balance = await rewardPointInstance.balanceOf.call(accounts[0]);
        const result = await rewardPointInstance.mint(accounts[0], 100);
        const newBalance = await rewardPointInstance.balanceOf.call(accounts[0]);

        assert.equal(newBalance.valueOf() - balance.valueOf(), 100, "100 wasn't minted in the first account");
    });
    it('should mint 100 RewardPoint in the second account', async() => {
        const rewardPointInstance = await RewardPoint.deployed();
        const balance = await rewardPointInstance.balanceOf.call(accounts[1]);
        const result = await rewardPointInstance.mint(accounts[1], 100);
        const newBalance = await rewardPointInstance.balanceOf.call(accounts[1]);

        assert.equal(newBalance.valueOf() - balance.valueOf(), 100, "100 wasn't minted in the second account");
    });
    it('should send coin correctly from Vendor:account0 to Customer:account2', async() => {
        const rewardPointInstance = await RewardPoint.deployed();

        // Setup 2 accounts.
        const accountOne = accounts[0];
        const accountTwo = accounts[2];

        // Get initial balances of first and second account.
        const accountOneStartingBalance = (await rewardPointInstance.balanceOf.call(accountOne)).toNumber();
        const accountTwoStartingBalance = (await rewardPointInstance.balanceOf.call(accountTwo)).toNumber();

        // Make transaction from first account to second.
        const amount = 10;
        const result = await rewardPointInstance.transfer(accountTwo, amount);

        // Get balances of first and second account after the transactions.
        const accountOneEndingBalance = (await rewardPointInstance.balanceOf.call(accountOne)).toNumber();
        const accountTwoEndingBalance = (await rewardPointInstance.balanceOf.call(accountTwo)).toNumber();


        assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
        assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
    });
    it('should redeem correctly from Customer:account2 to Vendor:account0', async() => {
        const rewardPointInstance = await RewardPoint.deployed();

        // Setup 2 accounts.
        const accountOne = accounts[0];
        const accountTwo = accounts[2];

        // Get initial balances of first and second account.
        const accountOneStartingBalance = (await rewardPointInstance.balanceOf.call(accountOne)).toNumber();
        const accountTwoStartingBalance = (await rewardPointInstance.balanceOf.call(accountTwo)).toNumber();

        // Make transaction from first account to second.
        const amount = 5;
        const result = await rewardPointInstance.transferFrom(accountTwo, accountOne, amount);

        // Get balances of first and second account after the transactions.
        const accountOneEndingBalance = (await rewardPointInstance.balanceOf.call(accountOne)).toNumber();
        const accountTwoEndingBalance = (await rewardPointInstance.balanceOf.call(accountTwo)).toNumber();


        assert.equal(accountOneEndingBalance, accountOneStartingBalance + amount, "Amount wasn't correctly taken from the sender");
        assert.equal(accountTwoEndingBalance, accountTwoStartingBalance - amount, "Amount wasn't correctly sent to the receiver");
    });
});