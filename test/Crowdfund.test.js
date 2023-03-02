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
    })
})