pragma solidity ^0.8;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/RewardPoint.sol";

contract TestRewardPoint {

  function testInitialBalanceUsingDeployedContract() public {
    RewardPoint rewardPoint = RewardPoint(DeployedAddresses.RewardPoint());

    uint expected = 0;

    Assert.equal(rewardPoint.balanceOf(tx.origin), expected, "Owner should have 0 RewardPoint initially");
  }

  function testInitialBalanceWithNewRewardPointCoin() public {
    RewardPoint rewardPoint = new RewardPoint();

    uint expected = 0;

    Assert.equal(rewardPoint.balanceOf(tx.origin), expected, "Owner should have 0 RewardPoint initially");
  }

}
