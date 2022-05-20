import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/Campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

function ContributeForm(props) {
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(props.address);
    setLoading(true);
    setErr("");

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      });

      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      console.log("MyError", err);
      setErr(err.message);
    }
    setErr("");
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} error={!!err}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          value={amount}
          labelPosition="right"
          onChange={(event) => setAmount(event.target.value)}
        ></Input>
      </Form.Field>
      <Message error header="Oops" content={err}></Message>
      <Button primary loading={loading}>
        Contribute !
      </Button>
    </Form>
  );
}

export default ContributeForm;
