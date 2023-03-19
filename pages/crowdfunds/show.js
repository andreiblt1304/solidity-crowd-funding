import React, { Component } from 'react';
import Layout from '../../components/Layout';

class CrowdfundShow extends Component {
    static async getInitialProps(props) {
        
        return {}
    }

    render () {
        return (
            <Layout>
                <h3>Crowdfund details</h3>
            </Layout>
        )
    }
}

export default CrowdfundShow;