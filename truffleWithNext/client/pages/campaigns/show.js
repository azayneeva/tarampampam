import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Web3Container from '../../lib/Web3Container';

class CampaignShow extends Component {
    render() {
        return (
            <Layout>  
                <h3>Show campaign</h3>
            </Layout>
        )
    }
};

export default () => (
    <Web3Container 
    renderLoading={() => <div>Loading CampaignShow Page...</div>}
    render={
            ({web3, accounts, contract}) => (
                <CampaignShow accounts={accounts} contract={contract} web3={web3} />
            )
        }
    />
);