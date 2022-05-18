import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x9333A2877a9B7C4d1bD79078A736eDB128E45C7A"
);

export default instance;
