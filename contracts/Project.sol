pragma solidity ^0.4.17;

contract DeployAProject {
    address[] public deployedProjects;

    function createProject(uint minimum) public {
        address newProject = new Project(minimum, msg.sender);
        deployedProjects.push(newProject);
    }

    function getDeployedProjects() public view returns (address[]) {
        return deployedProjects;
    }
}

contract Project {
    struct Task {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Task[] public tasks;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }


    constructor (uint minimum, address creator) public {
        manager = creator; 
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createTask(string description, uint value, address recipient) public restricted {
        Task memory newTask = Task({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        tasks.push(newTask);
    }

    function approveTask(uint index) public {
        Task storage task = tasks[index];

        require(approvers[msg.sender]);
        require(!task.approvals[msg.sender]);

        task.approvals[msg.sender] = true;
        task.approvalCount++;

    }

    function finalizeTask(uint index) public restricted {
        Task storage task = tasks[index];

        require(task.approvalCount > (approversCount / 2));
        require(!task.complete);

        task.complete = true;
        task.recipient.transfer(task.value);
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            tasks.length,
            approversCount,
            manager
        );
    }

    function getTasksCount() public view returns (uint) {
        return tasks.length;
    }
}