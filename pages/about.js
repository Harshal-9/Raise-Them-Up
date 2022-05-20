import Layout from "../components/Layout";
function AboutUs() {
  return (
    <Layout>
      <h1>About Us</h1>
      <div style={{ height: "450px" }}>
        <img src="https://thumbs.dreamstime.com/b/financial-donation-dollar-sign-made-people-crowd-white-background-vector-illustration-flat-style-concept-184117475.jpg" alt="donation"
          width="400px" height="450px" style={{ "float": "left" }} />
        <p style={{ fontSize: "1.3rem", marginLeft: "50%", marginRight: "8.5%", textAlign: "left" }}>
          We are making medical donation accessible for all.
          <br />
          <br />
          Pressing financial needs arising out of unprecedented emergencies can almost always be demanding. We enable anyone across India to raise funds for medical, community causes and more.
          <br />
          <br />
          This is a platform where you can donate money in the form of cryptocurrency to help people in need.
          <br />
          This platform uses blockchain technology to ensure that your donation is secure and anonymous.
          Each time a withdraw request is created then at least 50% of the doners should approve that request for actual withdrawal of money.


        </p>
      </div>


      <div class="ui  vertical footer segment">
        <div class="ui center aligned container">
          <div class="ui stackable grid">
            <div class="fourteen wide column" id="developed-by">
              <h4 class="ui header" style={{ display: 'inline-block' }}>Developed By </h4>
              <a href="https://www.linkedin.com/in/harshal-kodgire-9122001/" target="_blank">@Harshal Kodgire</a>
              <a href="https://www.linkedin.com/in/ruti-sawant/" target="_blank">@Rutikesh Sawant</a>
              <a href="https://www.linkedin.com/in/nikhil-danapgol-88a47a1b6/" target="_blank">@Nikhil Danapgol</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
