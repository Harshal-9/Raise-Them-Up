import { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/Campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

function NewRequest(props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);
    setLoading(true);
    setErrMsg("");

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Acc", accounts);
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${props.address}/requests`);
    } catch (err) {
      setErrMsg(err.message);
      console.log("err", err);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a New Request</h3>
      <Form onSubmit={handleSubmit} error={!!errMsg}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Amount in Ether</label>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errMsg} />
        <Button primary loading={loading}>
          Create !
        </Button>
      </Form>
    </Layout>
  );
}

NewRequest.getInitialProps = async (props) => {
  //   console.log("Paps", props);
  const { address } = props.query;
  //   console.log("IN here", address);
  return { address: address };
};

export default NewRequest;
