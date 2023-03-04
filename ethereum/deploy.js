const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CrowdfundFactory.json");

const provider = new HDWalletProvider(
    'imitate cactus same army buyer sword match palace festival stem left crucial',
    'https://goerli.infura.io/v3/f39e0f16154449f9b36c4efada7a824c'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    try {
        const result = await new web3.eth.Contract(compiledFactory.abi)
            .deploy({ data: compiledFactory.evm.bytecode.object })
            .send({ gas: "3000000", from: accounts[0] });

            console.log("Contract deployed to", result.options.address);
    } catch (error) {
        console.log(error)
    }
    provider.engine.stop();

};
deploy();