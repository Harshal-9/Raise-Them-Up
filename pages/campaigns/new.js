import react from "react";
import Layout from "../../components/Layout";
import { Form, Button, Checkbox, Input } from "semantic-ui-react";
import { useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

function CampaignNew() {
  const [minContribution, setMinContribution] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    await factory.methods.createCampaign(minContribution).send({
      from: accounts[0],
    });
  };

  return (
    <Layout>
      <div>
        <h3>Create A New Campaign !</h3>
        <Form onSubmit={handleSubmit}>
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
          <Button primary type="submit">
            Create !
          </Button>
        </Form>
      </div>
    </Layout>
  );
}
export default CampaignNew;
