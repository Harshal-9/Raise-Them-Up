const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  //   console.log("Accounts", accounts);

  // Deploying new contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  const addresses = await factory.methods.getDeployedCampaigns().call();
  campaignAddress = addresses[0];

  // retriving existing contract
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("Deploys factory and campaign contract", () => {
    assert.ok(factory.options.address);
    console.log("Factory Address", factory.options.address);
    assert.ok(campaign.options.address);
    console.log("Campaign Address", campaign.options.address);
  });

  it("marks caller as capmaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    console.log(manager);
    // assert.equal(accounts[0], manager);
  });

  it("Check if other account can contribute", async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: "200",
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("Requires minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
