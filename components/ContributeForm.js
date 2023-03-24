import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Crowdfund from '../ethereum/crowdfund';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const crowdfund = Crowdfund(this.props.address);    //contract instance
        
        try {
            const accounts = await web3.eth.getAccounts();
            await crowdfund.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/crowdfunds/${this.props.address}`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false, value:'' });
    }

    render() {
        return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                    label="ether"
                    labelPosition='right'
                />
            </Form.Field>
            <Button 
                primary 
                loading={this.state.loading}>
                Contribute!
            </Button>
            <Message error header="Oops" content={this.state.errorMessage}/>
        </Form>
        )
        
    }
}

export default ContributeForm;