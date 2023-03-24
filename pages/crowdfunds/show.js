import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Crowdfund from '../../ethereum/crowdfund';
import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CrowdfundShow extends Component {
    static async getInitialProps(props) {
        const crowdfund = Crowdfund(props.query.address);
        const summary = await crowdfund.methods.getDetails().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requests: summary[2],
            contributorsCount: summary[3],
            manager: summary[4]
        }
    }

    renderCards() {
        const {
            balance,
            minimumContribution,
            requests,
            contributorsCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The Manager created this campaign and create requests for the crowdfund',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You have to pay this much amount in order to become a contributor'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Balance of the crowdfund (ether)',
                description: 'The available balance inside the crowdfund'
            },
            {
                header: requests,
                meta: 'The number of available requests',
                description: `The number of requests that need to be fulfilled in order to achieve this project.
                            Those requests will take from the crowdfund's balance and automatically send it to the desired account`
            },
            {
                header: contributorsCount,
                meta: 'The number of active contributors',
                description: `The number of contributors that backed this project`
            }
        ];

        return <Card.Group items={items}/>;
    }

    render () {
        return (
            <Layout>
                <h3>Crowdfund details</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address}/>
                    </Grid.Column>
                </Grid>
                
            </Layout>
        )
    }
}

export default CrowdfundShow;