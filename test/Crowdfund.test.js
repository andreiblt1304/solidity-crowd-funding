const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CrowdfundFactory.json');
const compiledCrowdfund = require('../ethereum/build/Crowdfund.json');

let accounts;
let factory;
let crowdfundAddress;
let crowdfund;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });

    await factory.methods.createCrowdfund('100').send({
        from: accounts[0],
        gas: '2000000'
    });

    [crowdfundAddress] = await factory.methods.getDeployedCrowdfunds().call();
    
    crowdfund = await new web3.eth.Contract(
        compiledCrowdfund.abi,
        crowdfundAddress
    );
});

describe('Crowdfund', () => {
    it('Deploys a factory and crowdfund', () => {
        assert.ok(factory.options.address);
        assert.ok(crowdfund.options.address);
    });

    it('Caller is the crowdfund manager', async () => {
        const manager = await crowdfund.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('Allows people to contribute and marks them as approvers', async () => {
        await crowdfund.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });

        const isContributor = await crowdfund.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('Requires minimum contribution', async () => {
        try {
            await crowdfund.methods.contribute().send({
                value: '99',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('Allows a manager to create a request', async () => {
        await crowdfund.methods
            .createRequest('TestRequest', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '4000000'
            });

        const request = await crowdfund.methods.requests(0).call();
        assert.equal('TestRequest', request.description);
    });

    it('Processes request', async () => {
        let initialBalance = await web3.eth.getBalance(accounts[9]);
        initialBalance = parseFloat(web3.utils.fromWei(initialBalance, 'ether'));

        await crowdfund.methods
            .createRequest('TestRequest', web3.utils.toWei('10', 'ether'), accounts[9])
            .send({
                from: accounts[0],
                gas: '4000000'
            });

        await crowdfund.methods.contribute().send({
            value: web3.utils.toWei('5', 'ether'),
            from:accounts[1]
        });
        await crowdfund.methods.approveRequest(0).send({
            from: accounts[1],
            gas: '4000000'
        });

        await crowdfund.methods.contribute().send({
            value: web3.utils.toWei('5', 'ether'),
            from:accounts[2]
        });
        await crowdfund.methods.approveRequest(0).send({
            from: accounts[2],
            gas: '4000000'
        });

        await crowdfund.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '4000000'
        });

        let balanceAfterTransfer = await web3.eth.getBalance(accounts[9]);
        balanceAfterTransfer = parseFloat(web3.utils.fromWei(balanceAfterTransfer, 'ether'));

        assert(balanceAfterTransfer > initialBalance);
    })
})