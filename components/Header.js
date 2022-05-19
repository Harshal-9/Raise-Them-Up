import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
function Header() {
  return (
    <Menu style={{ marginTop: "15px" }}>
      <Link route="/">
        <a className="item">Raise Them Up</a>
      </Link>
      {/* <Menu.Item>Raise Them Up</Menu.Item> */}

      <Menu.Menu position="right">
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
