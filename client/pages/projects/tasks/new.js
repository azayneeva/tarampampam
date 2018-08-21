import React, {Component} from 'react';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Web3Container from '../../../lib/Web3Container';
import Project from '../../../lib/contracts/Project.json';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';

class NewTask extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        project: null,
        errorMessage: '',
        loading: false
    };

    async componentWillMount() {
        const {address, web3} = this.props;
        const project = await new web3.eth.Contract(Project.abi, address);
        this.setState({
            project
        })
    };

    onSubmit = async event => {
        const {description, value, recipient, project} = this.state;
        const {web3} = this.props;

        event.preventDefault();
        this.setState({
            loading: true
        })
        try {
            const accounts = await web3.eth.getAccounts();
            await project.methods
                .createTask(
                    description, 
                    web3.utils.toWei(value, 'ether'), 
                    recipient)
                .send({
                    from: accounts[0]
                })
            Router.pushRoute(`/projects/${this.props.address}/tasks`)
        } catch (error) {
            this.setState({
                errorMessage: error.message
            })
        }

        this.setState({
            loading: false
        })
    }

    render() {
        return (
            <Layout>
                <Link route={`/projects/${this.props.address}/tasks`}>
                    <a>
                        Back
                    </a>
                </Link>
                <h3>Create a Task</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event => this.setState({
                                description: event.target.value,
                                errorMessage: ''
                            })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => this.setState({
                                value: event.target.value,
                                errorMessage: ''
                            })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient} 
                            onChange={event => this.setState({
                                recipient: event.target.value,
                                errorMessage: ''
                            })}
                        />
                    </Form.Field>
                    <Message error header={'Oops!'} content={this.state.errorMessage} />
                    <Button basic color='blue' loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default class TaskNew extends Component {
    static async getInitialProps(props) {
        const address = props.query.address
        return {address}
    }

    render() {
        return (
            <Web3Container 
                renderLoading={() => <div>Loading NewTask Page...</div>}
                render={
                        ({web3, accounts, contract}) => (
                            <NewTask accounts={accounts} contract={contract} web3={web3} address={this.props.address}/>
                        )
                    }
            />
        )
    }
};