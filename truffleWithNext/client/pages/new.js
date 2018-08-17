import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import Web3Container from '../lib/Web3Container';
import Layout from '../components/Layout';

class CampaignIndex extends Component {
    state={
        campaigns: []
    }

    async componentWillMount() {
        const {contract} = this.props;
        const campaigns = await contract.methods.getDeployedCampaigns().call();
        this.setState({
            campaigns
        })
    }

    renderCampaigns = () => {
        const items = this.state.campaigns.map(campaign => {
            return {
                header: campaign,
                description: <a>View campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                    <h3>Open Campaigns</h3>
                    {this.renderCampaigns()}
                    <Button 
                        content='Create Campaign'
                        icon='add'
                        primary
                    />
                </div>
            </Layout>
        )
    }
}

export default () => (
    <Web3Container 
    renderLoading={() => <div>Loading CampaignIndex Page...</div>}
    render={
            ({web3, accounts, contract}) => (
                <CampaignIndex accounts={accounts} contract={contract} web3={web3} />
            )
        }
    />
);