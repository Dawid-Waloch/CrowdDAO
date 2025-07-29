// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGovernanceToken {
    function mint(address to, uint amount) external;
}

contract CrowdDAO {
    IGovernanceToken public token;

    constructor(address tokenAddress) {
        token = IGovernanceToken(tokenAddress);
    }

    function contribute() public payable {
        require(msg.value > 0, 'You have to send some ETH to contribute');

        token.mint(msg.sender, msg.value);
    }

}