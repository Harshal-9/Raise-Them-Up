import react from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";
import Head from "next/head";
function Layout(props) {
  return (
    <Container style={{ fontFamily: "verdana" }}>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
      {/* <h1>Footer</h1> */}
    </Container>
  );
}

export default Layout;
