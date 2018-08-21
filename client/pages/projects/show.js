import React, {Component} from 'react';
import {Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Web3Container from '../../lib/Web3Container';
import Campaign from '../../lib/contracts/Campaign.json';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {
    state = {
        minimumContribution: '',
        balance: '',
        requestsCount: '',
        approversCount: '',
        manager: '',
        campaign: null
    };

    async componentWillMount() {
        const {address, web3} = this.props;
        const campaign = await new web3.eth.Contract(Campaign.abi, address);
        const summary = await campaign.methods.getSummary().call();
        this.setState({
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            campaign
        }) 
    };

    renderCards = () => {
        const {minimumContribution, balance, requestsCount, approversCount, manager} = this.state;
        const {web3} = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much money to become an approver.'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.'
            }
        ];
        return <Card.Group items={items} />
    };
 
    render() {
        return (
            <Layout>  
                <h3>Project Details</h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} campaign={this.state.campaign} web3={this.props.web3}/>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/projects/${this.props.address}/requests`}>
                                <a>
                                    <Button basic color='blue'>
                                        View Tasks
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
};

export default class Show extends Component {
    static async getInitialProps(props) {
            const address = props.query.address
            return {address}
    }
    render() {
        return (
            <Web3Container 
                renderLoading={() => <div>Loading CampaignShow Page...</div>}
                render={
                        ({web3, accounts, contract}) => (
                            <CampaignShow accounts={accounts} contract={contract} web3={web3} address={this.props.address} />
                        )
                    }
            />
        )
    }
}
    