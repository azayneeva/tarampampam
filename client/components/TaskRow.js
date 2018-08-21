import React, {Component} from 'react';
import {Table, Button, Message} from 'semantic-ui-react';
import Project from '../lib/contracts/Project.json';

class TaskRow extends Component {
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
            const project = await new web3.eth.Contract(Project.abi, address);
            await project.methods
                .approveTask(id)
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
            const project = await new web3.eth.Contract(Project.abi, address);
            await project.methods
                .finalizeTask(id)
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
        const {id, task, web3, approversCount} = this.props;
        const readyToBeFinalized = task.approvalCount > approversCount/2;
        return (
            <Row disabled={task.complete} positive={readyToBeFinalized && !task.complete}>
                <Cell>{id}</Cell>
                <Cell>{task.description}</Cell>
                <Cell>{`${web3.utils.fromWei(task.value, 'ether')} ether`}</Cell>
                <Cell>{task.recipient}</Cell>
                <Cell>{`${task.approvalCount}/${approversCount}`}</Cell>
                <Cell>
                    {!task.complete &&
                        <Button color='green' basic onClick={this.onApprove}>Approve</Button>
                    }
                    {!!this.state.approveErrorMessage && <Message error>{this.state.approveErrorMessage}</Message>}
                </Cell>
                <Cell>
                    {!task.complete &&
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

export default TaskRow;