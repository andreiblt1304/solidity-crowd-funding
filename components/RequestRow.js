import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import Crowdfund from '../ethereum/crowdfund';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
    slicedAddress = (address) => {
        const truncateAddress = (address, charsToShow = 6) => {
          if (!address || address.length <= charsToShow * 2 + 3) {
            return address;
        }
            const start = address.slice(0, charsToShow);
            const end = address.slice(-charsToShow);
            return `${start}...${end}`;
        };
        const truncatedAddress = truncateAddress(address);

        return truncatedAddress;
    };

    initializeTransaction = async () => {
        const accounts = await web3.eth.getAccounts();
        const crowdfund = Crowdfund(this.props.address);
        return { accounts, crowdfund };
    };
    
    onApprove = async () => {
        const { accounts, crowdfund } = await this.initializeTransaction();
    
        await crowdfund.methods.approveRequest(this.props.id).send({
            from: accounts[0],
        });
    };
    
    onFinalize = async () => {
        const { accounts, crowdfund } = await this.initializeTransaction();
    
        await crowdfund.methods.finalizeRequest(this.props.id).send({
            from: accounts[0],
        });
    };
    

    // onApprove = async () => {
    //     const accounts = await web3.eth.getAccounts();
    //     const crowdfund = Crowdfund(this.props.address);

    //     await crowdfund.methods.approveRequest(this.props.id).send({
    //         from: accounts[0]
    //     });
    // }

    // onFinalize = async () => {
    //     const accounts = await web3.eth.getAccounts();
    //     const crowdfund = Crowdfund(this.props.address);

    //     await crowdfund.methods.finalizeRequest(this.props.id).send({
    //         from:accounts[0]
    //     });
    // }

    render () {
        const { Row, Cell } = Table;
        const { id, request, contributorsCount } = this.props;

        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.request.value, 'ether')}</Cell>
                <Cell>{this.slicedAddress(request.recipient)}</Cell>
                <Cell>{request.approvalsCount}/{contributorsCount}</Cell>
                <Cell>
                    <Button color='green' basic onClick={this.onApprove}>
                        Approve
                    </Button>
                </Cell>
                <Cell>
                    <Button color='red' basic onClick={this.onFinalize}>
                        Finalize
                    </Button>
                </Cell>
            </Row>
        )
    }
}

export default RequestRow;