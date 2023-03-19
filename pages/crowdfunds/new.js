import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CrowdfundNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .createCrowdfund(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <h3>Create a new crowdfund</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum contribution (wei)</label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => 
                                this.setState({ minimumContribution: event.target.value})}
                            
                        />
                        <Message 
                            error 
                            header="Oops!"
                            content={this.state.errorMessage}
                        />
                        <Button loading={this.state.loading} primary>Create</Button>
                    </Form.Field>
                </Form>
            </Layout>
        );    
    }
}

export default CrowdfundNew;