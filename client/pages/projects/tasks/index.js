import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Web3Container from '../../../lib/Web3Container';
import Layout from '../../../components/Layout';
import Project from '../../../lib/contracts/Project.json';
import TaskRow from '../../../components/TaskRow';

class TaskIndex extends Component {
    state = {
        tasks: null,
        taskCount: '',
        approversCount: ''
    };

    async componentWillMount() {
        const {address, web3} = this.props;
        const project = await new web3.eth.Contract(Project.abi, address);
        const taskCount = await project.methods.getTasksCount().call();
        const tasks = await Promise.all(
            Array(parseInt(taskCount)).fill().map((element, index) => {
                return project.methods.tasks(index).call()
            })
        );
        const approversCount = await project.methods.approversCount().call();
        this.setState({
            tasks,
            taskCount,
            approversCount
        });
    };

    renderRows = () => {
        if (this.state.tasks) {
            return this.state.tasks.map(((task, index) => {
                return <TaskRow 
                    key={index}
                    id={index}
                    task={task}
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
                <h3>Tasks</h3>
                <Link route={`/projects/${this.props.address}/tasks/new`}>
                    <a>
                        <Button basic color='blue' floated='right' style={{marginBottom: 10}}>Add a Task</Button>
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
                <div>{this.state.taskCount} tasks</div>
            </Layout>
        )
    }
};

export default class Task extends Component {
    static async getInitialProps(props) {
            const {address} = props.query;
            return {address}
    }
    render() {
        return (
            <Web3Container 
                renderLoading={() => <div>Loading TaskIndex Page...</div>}
                render={
                        ({web3, accounts, contract}) => (
                            <TaskIndex accounts={accounts} contract={contract} web3={web3} address={this.props.address} />
                        )
                    }
            />
        )
    }
}