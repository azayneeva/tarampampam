const CampaignFactory = artifacts.require('CampaignFactory');
const Campaign = artifacts.require('Campaign');

contract('CampaignFactory', accounts => {
    let meta;
    let deployedCampaign;
    it('deploys a factory and a campaign', () => {
        return CampaignFactory.deployed()
            .then(instance => {
                meta = instance;
                return meta.createCampaign('100', {from: accounts[0], gas: '1000000'})
            })
            .then(() => {
                return meta.getDeployedCampaigns.call();
            })
            .then(deployedCampaigns => {
                deployedCampaign = deployedCampaigns[0];
                const campaign = Campaign.at(deployedCampaign).address;
                assert.ok(deployedCampaign);
                assert.ok(campaign);
            })
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await Campaign.at(deployedCampaign).manager.call()
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await Campaign.at(deployedCampaign).contribute({
            value: '200',
            from: accounts[0]
        });
        const isContributor = await Campaign.at(deployedCampaign).approvers.call(accounts[0]);
        assert(isContributor);
    });  

    it('requires a minimum contribution', async () => {
        try {
            await Campaign.at(deployedCampaign).contribute({
                value: '10',
                from: accounts[2]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
    
    it('allows a manager to make a payment request', () => {
       return Campaign.at(deployedCampaign)
            .createRequest('buy batteries', '100', accounts[1], {
                from: accounts[0], 
                gas: '1000000'
            })
            .then(() => {
                return Campaign.at(deployedCampaign).requests.call(0);
            })
            .then(res => {
                assert.equal(res[0], 'buy batteries');
            })
    });

    it('allows contributors to approve a request', async () => {
        await Campaign.at(deployedCampaign)
            .approveRequest('0', {
                from: accounts[0],
                gas: '1000000'
            });
        const approvers = await Campaign.at(deployedCampaign).approversCount.call();
        assert.equal(approvers, 1);
        const request = await Campaign.at(deployedCampaign).requests.call(0);
        assert.ok(1, request[4])
    });

    it('allows a manager to finalize the request', async () => {
        await Campaign.at(deployedCampaign)
            .finalizeRequest('0', {
                from: accounts[0],
                gas: '1000000'
            });
        const request = await Campaign.at(deployedCampaign).requests.call(0);
        assert.ok(request[3]);
    })
});
