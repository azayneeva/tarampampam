import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import {Router} from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        const {web3, campaign, address} = this.props;
        event.preventDefault();
        this.setState({
            loading: true
        })
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })
            Router.pushRoute(`/projects/${address}`)
        } catch (error) {
            this.setState({
                loading: false,
                errorMessage: error.message
            })
        }
        this.setState({
            loading: false,
            value: ''
        })
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        label='ether'
                        labelPosition='right'
                        value={this.state.value}
                        onChange={event => {
                            this.setState({
                                value: event.target.value,
                                errorMessage: ''
                            })
                        }}
                    />
                </Form.Field>
                <Message error header={'Oops!'} content={this.state.errorMessage}/>
                <Button basic color='blue' loading={this.state.loading}>
                    Contribute
                </Button>
            </Form>
        )
    }
};

export default ContributeForm;