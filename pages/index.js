import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CrowdfundIndex extends Component {
    static async getInitialProps() {
        const crowdfunds = await factory.methods.getDeployedCrowdfunds().call();

        return { crowdfunds };
    }

    render() {
        return <div>Available crowdfunds: { this.props.crowdfunds }</div>
    }
}

export default CrowdfundIndex;