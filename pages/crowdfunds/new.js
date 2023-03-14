import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";

class CrowdfundNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();

        await factory.methods
            .createCrowdfund(this.state.minimumContribution)
            .send({
                from: accounts[0]
            });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
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
                        <Button primary>Create</Button>
                    </Form.Field>
                </Form>
            </Layout>
        );    
    }
}

export default CrowdfundNew;