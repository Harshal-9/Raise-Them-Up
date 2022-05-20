import react from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import fetchCampaignFromAddress from "../../ethereum/Campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

function CampaignShow(props) {
  function CampaignCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can request to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution",
        description:
          "You much contribute at least this much amount to become an approver",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the contract.Requests must be approved by approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance(ether)",
        description:
          "The balance is how much money this campaign has left to spend",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }

  return (
    <Layout>
      <h3>Show Campaign</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <CampaignCards />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

CampaignShow.getInitialProps = async (props) => {
  // console.log("address", props.query.address);
  // return { address: props.query.address };
  const fetchedCampaign = fetchCampaignFromAddress(props.query.address);
  console.log(fetchedCampaign);
  const summary = await fetchedCampaign.methods.getSummary().call();
  console.log("Summary", summary);
  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignShow;
