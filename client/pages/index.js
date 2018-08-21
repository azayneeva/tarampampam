import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import Web3Container from '../lib/Web3Container';
import Layout from '../components/Layout';
import {Link} from '../routes';

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
                description: (
                    <Link route={`/projects/${campaign}`}>
                        <a>View a project</a>
                    </Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Projects</h3>
                    <Link route='/projects/new'>
                        <a>
                            <Button 
                                content='Create a Project'
                                floated='right'
                                icon='add'
                                basic color='blue'
                            />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
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