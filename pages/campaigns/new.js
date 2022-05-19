import react from "react";
import Layout from "../../components/Layout";
import { Form, Button, Checkbox, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

function CampaignNew() {
  const [minContribution, setMinContribution] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErr("");
    try {
      console.log(event);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (err) {
      console.log("Error", err);
      setErr(err);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <h3>Create A New Campaign !</h3>
        <Form onSubmit={handleSubmit} error={!!err}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="Minimum Contribution"
              value={minContribution}
              onChange={(event) => setMinContribution(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Message error header="Oops !" content={err.message} />
          <Button loading={loading} primary type="submit">
            Create !
          </Button>
        </Form>
      </div>
    </Layout>
  );
}
export default CampaignNew;
