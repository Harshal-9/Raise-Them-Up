import react from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";
import Campaign from "../ethereum/Campaign";

function CampaignIndex(props) {
  function CampaignCard() {
    const items = props.campaigns.map(({ address, name }) => {
      console.log("Ad ", address, name);
      return {
        header: name,
        description: (
          <>
            <p>{address}</p>
            <Link route={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          </>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  return (
    <Layout>
      <div>
        <br />
        <h2 style={{ fontFamily: "cursive", color: "red" }}>
          <i>
            <q>
              A small contribution you make today will shape a better future of
              someone for tomorrow
            </q>
          </i>
        </h2>
        <h3>Contribute in Campaigns</h3>
        <br />
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add square"
              primary
            />
          </a>
        </Link>
        <CampaignCard />
      </div>
    </Layout>
  );
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  console.log(campaigns);

  let campaignDetails = [];

  async function getNames() {
    for (let campAddress of campaigns) {
      console.log("x", campAddress);
      const requestCount = await Campaign(campAddress)
        .methods.getRequestsCount()
        .call();
      console.log(requestCount);
      let name = await Campaign(campAddress).methods.campaignName().call();
      console.log(name);
      campaignDetails.push({ name: name, address: campAddress });
    }
  }
  await getNames();
  console.log("Names", campaignDetails);

  return { campaigns: campaignDetails };
};

export default CampaignIndex;
