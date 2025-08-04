// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGovernanceToken {
    function mint(address to, uint amount) external;
    function balanceOf(address whose) external view returns (uint);
    function burn(address from, uint amount) external;
}

contract CrowdDAO {
    enum ProposalStatus { Otwarta, Zamknieta }
    struct Proposal {
        string description;
        address recipient;
        uint value;
        mapping(address => bool) voters;
        uint[2] votes;
        ProposalStatus status;
    }

    IGovernanceToken public token;
    uint public rate;
    Proposal[] public proposals;
    address manager;

    constructor(address tokenAddress) {
        token = IGovernanceToken(tokenAddress);
        rate = 1;
    }

    function contribute() public payable {
        require(msg.value > 0, 'You have to send some ETH to contribute');

        uint amount = (msg.value * rate) / 1 ether;
        token.mint(msg.sender, amount);
        manager = msg.sender;
    }

    function createProposal(string memory purpose, uint value, address recipient) public {
        require(token.balanceOf(msg.sender) > 0, "You don't have tokens so you can't create proposals");

        proposals.push();
        Proposal storage newProposal = proposals[proposals.length - 1];

        newProposal.description = purpose;
        newProposal.recipient = recipient;
        newProposal.value = value;
        newProposal.votes = [uint(0), uint(0)];
        newProposal.status = ProposalStatus.Otwarta;
    }

    function vote(uint proposalIndex, bool votingDecision, uint numOfVotes) public {
        require(proposalIndex < proposals.length, "These proposal with these index doesn't exist");
        require(proposals[proposalIndex].status == ProposalStatus.Otwarta);
        require(token.balanceOf(msg.sender) > 0, "You don't have enough tokens to vote");
        require(numOfVotes <= token.balanceOf(msg.sender), "You don't have as much tokens to vote, choose less votes");
        require(!(proposals[proposalIndex].voters[msg.sender]), "You have already voted");

        Proposal storage proposal = proposals[proposalIndex];
        if(votingDecision) {
            proposal.votes[0] += numOfVotes;
        } else {
            proposal.votes[1] += numOfVotes;
        }

        token.burn(msg.sender, numOfVotes);
        proposal.voters[msg.sender] = true;
    }

    function executeProposal(uint proposalIndex) public onlyOwner {
        require(proposals[proposalIndex].status == ProposalStatus.Otwarta, "Proposal have been already realized, You can't execute it twice");

        Proposal storage proposal = proposals[proposalIndex];
        payable(proposal.recipient).transfer(proposal.value);
        proposal.status = ProposalStatus.Zamknieta;
    }

    function getProposal(uint proposalIndex) public view returns (
        string memory description,
        address recipient,
        uint value,
        uint yesVotes,
        uint noVotes,
        ProposalStatus status
    ) {
        Proposal storage proposal = proposals[proposalIndex];

        return (
            proposal.description,
            proposal.recipient,
            proposal.value,
            proposal.votes[0],
            proposal.votes[1],
            proposal.status
        );
    }

    modifier onlyOwner() {
        require(msg.sender == manager, "You aren't an owner");
        _;
    }

}