import web3 from './web3';
import CrowdfundFactory from './build/CrowdfundFactory.json';

const instance = new web3.eth.Contract(
    CrowdfundFactory.abi, 
    '0x82cb51C643Dab44587d9Da6817AF6725933dbC8a'
);

export default instance;