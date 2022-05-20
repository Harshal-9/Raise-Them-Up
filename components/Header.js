import { Menu } from "semantic-ui-react";
import { Link, Router } from "../routes";
function Header() {
  return (
    <Menu style={{ marginTop: "15px", fontFamily: "verdana" }}>
      <Link route="/">
        {/* <a> */}
        <img
          src="https://img.favpng.com/6/6/16/donate-png-favpng-HKBdqXw7AGbutex2Qmy3cpmKU.jpg"
          alt="RaiseThemUpLogo"
          width="100px"
          // height="100px"
          onClick={() => Router.pushRoute("/")}
          style={{ cursor: "pointer" }}
        />
        {/* </a> */}
      </Link>

      <Link route="/">
        <a
          style={{
            width: "500px",
            textAlign: "center",
            marginLeft: "25%",
            fontSize: "20px",
            // fontWeight: "bold",
          }}
          className="item"
        >
          Raise Them Up
        </a>
      </Link>
      {/* <Menu.Item>Raise Them Up</Menu.Item> */}

      <Menu.Menu position="right">
        <Link route="/about">
          <a className="item">About Us</a>
        </Link>
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
        {/* <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item>+</Menu.Item> */}
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
