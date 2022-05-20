import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/Campaign";
import UpdateSuccessToast, {
  CustomToast,
  FailureToast,
} from "../components/AllToasts";
import { ToastContainer } from "react-toastify";
import { Router } from "../routes";

function ReqeustRow(props) {
  const { Row, Cell } = Table;
  const { request, id, approversCount } = props;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  const onApprove = async () => {
    const campaign = Campaign(props.address);
    console.log(props.address);
    const account = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(props.id).send({
        from: account[0],
      });
      UpdateSuccessToast("Request Approved Successfully !");
    } catch (err) {
      console.log("Err", err);
      FailureToast();
    }
    Router.replaceRoute(`/campaigns/${props.address}/requests`);
  };

  const finalize = async () => {
    const campaign = Campaign(props.address);
    const account = await web3.eth.getAccounts();
    try {
      await campaign.methods.finalizeRequest(props.id).send({
        from: account[0],
      });
      UpdateSuccessToast("Amount transferred successfully");
    } catch (err) {
      console.log("Err", err);
      FailureToast();
    }
    Router.replaceRoute(`/campaigns/${props.address}/requests`);
  };

  return (
    <>
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={finalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
      <ToastContainer />
    </>
  );
}

export default ReqeustRow;
