import react from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

function CampaignIndex(props) {
  function CampaignCard() {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
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
  return { campaigns };
};

export default CampaignIndex;
