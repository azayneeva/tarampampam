import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import Web3Container from '../lib/Web3Container';
import Layout from '../components/Layout';
import {Link} from '../routes';

class ProjectIndex extends Component {
    state={
        projects: []
    }

    async componentWillMount() {
        const {contract} = this.props;
        const projects = await contract.methods.getDeployedProjects().call();
        this.setState({
            projects
        })
    }

    renderProjects = () => {
        const items = this.state.projects.map(project => {
            return {
                header: project,
                description: (
                    <Link route={`/projects/${project}`}>
                        <a>View a project</a>
                    </Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Projects</h3>
                    <Link route='/projects/new'>
                        <a>
                            <Button 
                                content='Create a Project'
                                floated='right'
                                icon='add'
                                basic color='blue'
                            />
                        </a>
                    </Link>
                    {this.renderProjects()}
                </div>
            </Layout>
        )
    }
}

export default () => (
    <Web3Container 
    renderLoading={() => <div>Loading ProjectIndex Page...</div>}
    render={
            ({web3, accounts, contract}) => (
                <ProjectIndex accounts={accounts} contract={contract} web3={web3} />
            )
        }
    />
);