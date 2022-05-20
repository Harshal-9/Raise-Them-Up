import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x766b44B6a0bF7D957F475beF1eF19ccfE6B5B1C2"
);

export default instance;
