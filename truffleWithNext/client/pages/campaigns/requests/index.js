import React, {Component} from 'react';
import Web3Container from '../../../lib/Web3Container';

class RequestIndex extends Component {
    render() {
        return <h3>Request List</h3>
    }
};

export default () => (
    <Web3Container 
    renderLoading={() => <div>Loading RequestIndex Page...</div>}
    render={
            ({web3, accounts, contract}) => (
                <RequestIndex accounts={accounts} contract={contract} web3={web3} />
            )
        }
    />
);