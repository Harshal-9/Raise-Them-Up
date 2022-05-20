import react from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/Campaign";
import ReqeustRow from "../../../components/RequestRow";

function RequestIndex(props) {
  console.log("Yaha", props);
  const { Header, Row, HeaderCell, Body } = Table;

  function RenderRows() {
    console.log("requests", props.requests);
    return props.requests.map((request, index) => {
      return (
        <ReqeustRow
          request={request}
          key={index}
          id={index}
          address={props.address}
          approversCount={props.approversCount}
        />
      );
    });
  }

  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${props.address}/requests/newRequest`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          <RenderRows />
        </Body>
      </Table>
      <div>Found {props.requestCount} requests.</div>
    </Layout>
  );
}

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  console.log("ApproversCount", approversCount);

  console.log("Arr", requests);
  return {
    address: address,
    requests: requests,
    requestCount: requestCount,
    approversCount: approversCount,
  };
};

export default RequestIndex;
