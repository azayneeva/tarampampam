import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Web3Container from '../../../lib/Web3Container';
import Layout from '../../../components/Layout';
import Campaign from '../../../lib/contracts/Campaign.json';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    state = {
        requests: null,
        requestCount: '',
        approversCount: ''
    };

    async componentWillMount() {
        const {address, web3} = this.props;
        const campaign = await new web3.eth.Contract(Campaign.abi, address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );
        const approversCount = await campaign.methods.approversCount().call();
        this.setState({
            requests,
            requestCount,
            approversCount
        });
    };

    renderRows = () => {
        if (this.state.requests) {
            return this.state.requests.map(((request, index) => {
                return <RequestRow 
                    key={index}
                    id={index}
                    request={request}
                    web3={this.props.web3}
                    approversCount={this.state.approversCount}
                    address={this.props.address}
                />
            }))
        }
    };

    render() {
        const {Header, Row, HeaderCell, Body} = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated='right' style={{marginBottom: 10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.state.requestCount} requests</div>
            </Layout>
        )
    }
};

export default class Request extends Component {
    static async getInitialProps(props) {
            const {address} = props.query;
            return {address}
    }
    render() {
        return (
            <Web3Container 
                renderLoading={() => <div>Loading RequestIndex Page...</div>}
                render={
                        ({web3, accounts, contract}) => (
                            <RequestIndex accounts={accounts} contract={contract} web3={web3} address={this.props.address} />
                        )
                    }
            />
        )
    }
}