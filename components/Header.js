import { Menu } from "semantic-ui-react";

function Header() {
  return (
    <Menu style={{ marginTop: "15px" }}>
      <Menu.Item>Raise Them Up</Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
