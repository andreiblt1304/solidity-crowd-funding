// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CrowdfundFactory {
    Crowdfund[] public deployedCrowdfunds;

    function createCrowdfund(uint minimum) public {
        Crowdfund newCrowdfund = new Crowdfund(minimum, msg.sender);
        deployedCrowdfunds.push(newCrowdfund);
    }

    function getDeployedCrowdfunds() public view returns (Crowdfund[] memory) {
        return deployedCrowdfunds;
    }
}

contract Crowdfund {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalsCount;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(uint => mapping(address => bool)) public approvals;
    Request[] public requests;
    uint public contributorsCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator; 
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        contributorsCount++;
    }

    function createRequest(
        string memory description, 
        uint value, 
        address payable recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalsCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint requestIndex) public {
        require(approvers[msg.sender]);
        require(msg.sender != manager);
        require(!approvals[requestIndex][msg.sender]);

        approvals[requestIndex][msg.sender] = true;
        requests[requestIndex].approvalsCount++;
    }

    function finalizeRequest(uint requestIndex) public payable restricted {
        Request storage request = requests[requestIndex];
        require(request.approvalsCount > (contributorsCount / 2), 
            "There has to be more at least 50% percent of approves");
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getDetails() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            contributorsCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}