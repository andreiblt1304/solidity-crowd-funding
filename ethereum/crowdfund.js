import web3 from "./web3";
import Crowdfund from './build/Crowdfund.json'

export default (address) => {
    return new web3.eth.Contract(
        Crowdfund.abi,
        address
    )
}