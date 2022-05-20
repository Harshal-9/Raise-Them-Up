import react from "react";
import Layout from "../../components/Layout";
import { Form, Button, Checkbox, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";
import UpdateSuccessToast, { CustomToast } from "../../components/AllToasts";
import { ToastContainer } from "react-toastify";

function CampaignNew() {
  const [minContribution, setMinContribution] = useState("");
  const [managerName, setManagerName] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");

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
      await factory.methods
        .createCampaign(
          minContribution,
          managerName,
          campaignName,
          campaignDescription
        )
        .send({
          from: accounts[0],
        });

      UpdateSuccessToast("Campaign created successfully");
      setTimeout(() => {
        Router.pushRoute("/");
      }, 2000);
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
            <label>Enter Name for Campaign</label>
            <Input
              required
              placeholder="Campaign Name"
              value={campaignName}
              onChange={(event) => setCampaignName(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Description of Campaign</label>
            <Input
              required
              placeholder="Campaign Description"
              value={campaignDescription}
              onChange={(event) => setCampaignDescription(event.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Enter Name (Campaign Manager)</label>
            <Input
              required
              placeholder="Manager Name"
              value={managerName}
              onChange={(event) => setManagerName(event.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              required
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
      <ToastContainer />
    </Layout>
  );
}
export default CampaignNew;
