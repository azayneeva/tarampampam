import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Web3Container from '../../../lib/Web3Container';
import Layout from '../../../components/Layout';
import Campaign from '../../../lib/contracts/Campaign.json';

class RequestIndex extends Component {
    state = {
        requests: null,
        requestCount: ''
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

        this.setState({
            requests,
            requestCount
        });
    };

    render() {
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
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