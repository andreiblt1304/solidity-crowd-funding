import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Crowdfund from '../../../ethereum/crowdfund';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const crowdfund = Crowdfund(address);
        const requestsCount = await crowdfund.methods.getRequestCount().call();
        const contributorsCount = await crowdfund.methods.contributorsCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestsCount))
            .fill()
            .map((element, index) => {
                return crowdfund.methods.requests(index).call();
            })
        );

        return { address, requests, requestsCount, contributorsCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                        key={index}
                        id={index}
                        request={request}
                        address={this.props.address}
                        contributorsCount={this.props.contributorsCount}
                    />;
        });
    }

    render () {
        const { Header, Row, HeaderCell, Body} = Table;
        return (
            <Layout>
                <h3>Requests list</h3>
                <Link route={`/crowdfunds/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approvals count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </Layout>
        )
    }
}

export default RequestIndex;