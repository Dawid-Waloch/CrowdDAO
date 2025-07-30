// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGovernanceToken {
    function mint(address to, uint amount) external;
    function balanceOf(address whose) external view returns (uint);
}

contract CrowdDAO {
    enum ProposalStatus { Otwarta, Zamknieta, Zrealizowana }
    struct Proposal {
        string description;
        address recipient;
        uint value;
        uint[2] votes;
        ProposalStatus status;
    }

    IGovernanceToken public token;
    uint public rate;
    Proposal[] public proposals;

    constructor(address tokenAddress) {
        token = IGovernanceToken(tokenAddress);
        rate = 100;
    }

    function contribute() public payable {
        require(msg.value > 0, 'You have to send some ETH to contribute');

        uint amount = (msg.value * rate) / 1 ether;
        token.mint(msg.sender, amount);
    }

    function createProposal(string memory purpose, uint value) public {
        require(token.balanceOf(msg.sender) > 0, "You don't have tokens so you can't create proposals");
        Proposal memory newProposal = Proposal({
            description: purpose,
            recipient: msg.sender,
            value: value,
            votes: [uint(0), uint(0)],
            status: ProposalStatus.Otwarta
        });
        proposals.push(newProposal);
    }

}