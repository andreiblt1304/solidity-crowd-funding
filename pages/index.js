import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

class CrowdfundIndex extends Component {
    static async getInitialProps() {
        const crowdfunds = await factory.methods.getDeployedCrowdfunds().call();

        return { crowdfunds };
    }

    renderCrowdfunds() {
        const items = this.props.crowdfunds.map((crowdfundAddress) => {
            return {
                header: crowdfundAddress,
                description: <a>view crowdfund</a>,
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css"/>
                    <h3>Open Crowdfunds</h3>
                    <Button
                        floated='right'
                        content="Create Crowdfund"
                        icon="add"
                        primary
                    />
                    {this.renderCrowdfunds()}
                </div>
            </Layout>
        )
    }
}

export default CrowdfundIndex;