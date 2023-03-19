import web3 from './web3';
import CrowdfundFactory from './build/CrowdfundFactory.json';

const instance = new web3.eth.Contract(
    CrowdfundFactory.abi, 
    '0xb7173B5aC4056Be02Caa8cc51c890D83e97cfdDF'
);

export default instance;