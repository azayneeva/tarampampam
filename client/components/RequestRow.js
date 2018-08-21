import React, {Component} from 'react';
import {Table, Button, Message} from 'semantic-ui-react';
import Campaign from '../lib/contracts/Campaign.json';

class RequestRow extends Component {
    state = {
        approveErrorMessage: '',
        finalizeErrorMessage: ''
    }

    onApprove = async () => {
        const {address, id, web3} = this.props;
        this.setState({
            approveErrorMessage: '',
            finalizeErrorMessage: ''
        })
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = await new web3.eth.Contract(Campaign.abi, address);
            await campaign.methods
                .approveRequest(id)
                .send({
                    from: accounts[0]
                })
        } catch (error) {
            this.setState({
                approveErrorMessage: error.message
            })
        }
    };

    onFinalize = async () => {
        const {address, id, web3} = this.props;
        this.setState({
            approveErrorMessage: '',
            finalizeErrorMessage: ''
        })
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = await new web3.eth.Contract(Campaign.abi, address);
            await campaign.methods
                .finalizeRequest(id)
                .send({
                    from: accounts[0]
                })
        } catch (error) {
            this.setState({
                finalizeErrorMessage: error.message
            })
        }
    };

    render() {
        const {Row, Cell} = Table;
        const {id, request, web3, approversCount} = this.props;
        const readyToBeFinalized = request.approvalCount > approversCount/2;
        return (
            <Row disabled={request.complete} positive={readyToBeFinalized && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{`${web3.utils.fromWei(request.value, 'ether')} ether`}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{`${request.approvalCount}/${approversCount}`}</Cell>
                <Cell>
                    {!request.complete &&
                        <Button color='green' basic onClick={this.onApprove}>Approve</Button>
                    }
                    {!!this.state.approveErrorMessage && <Message error>{this.state.approveErrorMessage}</Message>}
                </Cell>
                <Cell>
                    {!request.complete &&
                        <Button basic color='blue' basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    }
                    {!!this.state.finalizeErrorMessage && <Message error>{this.state.finalizeErrorMessage}</Message>}
                </Cell>
            </Row>
        )
    }
};

export default RequestRow;