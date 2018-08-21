const DeployAProject = artifacts.require('DeployAProject');
const Project = artifacts.require('Project');

contract('DeployAProject', accounts => {
    let meta;
    let deployedProject;
    it('deploys both contracts: DeployAProject and Project', () => {
        return DeployAProject.deployed()
            .then(instance => {
                meta = instance;
                return meta.createProject('100', {from: accounts[0], gas: '1000000'})
            })
            .then(() => {
                return meta.getDeployedProjects.call();
            })
            .then(deployedProjects => {
                deployedProject = deployedProjects[0];
                const project = Project.at(deployedProject).address;
                assert.ok(deployedProject);
                assert.ok(project);
            })
    });

    it('marks caller as the project manager', async () => {
        const manager = await Project.at(deployedProject).manager.call()
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await Project.at(deployedProject).contribute({
            value: '200',
            from: accounts[0]
        });
        const isContributor = await Project.at(deployedProject).approvers.call(accounts[0]);
        assert(isContributor);
    });  

    it('requires a minimum contribution', async () => {
        try {
            await Project.at(deployedProject).contribute({
                value: '10',
                from: accounts[2]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
    
    it('allows a manager to create a payment task', () => {
       return Project.at(deployedProject)
            .createTask('buy batteries', '100', accounts[1], {
                from: accounts[0], 
                gas: '1000000'
            })
            .then(() => {
                return Project.at(deployedProject).tasks.call(0);
            })
            .then(res => {
                assert.equal(res[0], 'buy batteries');
            })
    });

    it('allows contributors to approve a task', async () => {
        await Project.at(deployedProject)
            .approveTask('0', {
                from: accounts[0],
                gas: '1000000'
            });
        const approvers = await Project.at(deployedProject).approversCount.call();
        assert.equal(approvers, 1);
        const task = await Project.at(deployedProject).tasks.call(0);
        assert.ok(1, task[4])
    });

    it('allows a manager to finalize the task', async () => {
        await Project.at(deployedProject)
            .finalizeTask('0', {
                from: accounts[0],
                gas: '1000000'
            });
        const task = await Project.at(deployedProject).tasks.call(0);
        assert.ok(task[3]);
    })
});
