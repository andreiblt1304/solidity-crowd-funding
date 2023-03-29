import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Crowdfund from "../../../ethereum/crowdfund";
import web3 from "../../../ethereum/web3";
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }

    static async getInitialProps(props) {
        const address = props.query;

        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();

        const crowdfund = Crowdfund(this.props.address);
        const { description, value, recipient } = this.state;
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            crowdfund.options.address = this.props.address.address;

            await crowdfund.methods
            .createRequest(
                description, 
                web3.utils.toWei(value, 'ether'), 
                recipient
            )
            .send({ from: accounts[0] });

            Router.pushRoute(`/crowdfunds/${this.props.address}/requests`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false });
    }
    render() {
        return (
            <Layout>
                <Link route={`/crowdfunds/${this.props.address}/requests`}>
                    <a>
                        <Button primary>Back</Button>
                    </a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description} 
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value} 
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient's address</label>
                        <Input 
                            value={this.state.recipient} 
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>
                        Create
                    </Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;