import React, {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Web3Container from '../../lib/Web3Container';
import {Router} from '../../routes';

class ProjectNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {

        const {contract, web3} = this.props;

        event.preventDefault();

        this.setState({
            loading: true,
            errorMessage: ''
        });

        try {
            const accounts = await web3.eth.getAccounts();
            console.log('show me accounts', accounts)
            await contract.methods
                .createProject(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                })
            Router.pushRoute('/')
        } catch (error) {
            console.log('error with submitting the form', error.message)
            this.setState({errorMessage: error.message})
        }  
        
        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Create a New Project</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label='wei' 
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={event => {
                                    this.setState({
                                        minimumContribution: event.target.value,
                                        errorMessage: ''
                                    })
                                }
                            }
                        />
                    </Form.Field>
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button loading={this.state.loading} floated='right' basic color='blue'>Create</Button>
                </Form>
            </Layout>
        )
    };
};

export default () => (
    <Web3Container 
    renderLoading={() => <div>Loading ProjectNew Page...</div>}
    render={
            ({web3, accounts, contract}) => (
                <ProjectNew accounts={accounts} contract={contract} web3={web3} />
            )
        }
    />
);