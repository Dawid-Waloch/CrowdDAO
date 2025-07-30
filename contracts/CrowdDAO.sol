// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGovernanceToken {
    function mint(address to, uint amount) external;
}

contract CrowdDAO {
    IGovernanceToken public token;
    uint rate;

    constructor(address tokenAddress) {
        token = IGovernanceToken(tokenAddress);
        rate = 100 * (10 ** 18);
    }

    function contribute() public payable {
        require(msg.value > 0, 'You have to send some ETH to contribute');

        uint amount = msg.value * rate;
        token.mint(msg.sender, amount);
    }

}