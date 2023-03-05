import web3 from './web3';
import CrowdfundFactory from './build/CrowdfundFactory.json';

const instance = new web3.eth.Contract(
    CrowdfundFactory.abi, 
    '0x254867644D1Bd51Bb48D3eeDE17385fCb71E3976'
);

export default instance;