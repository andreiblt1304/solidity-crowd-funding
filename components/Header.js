import React from "react";
import { Menu } from "semantic-ui-react";

const Header = (props) => {
    return(
        <Menu style={{ marginTop: '15px' }}>
            <Menu.Item>CrowdCoin</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>Crowdfunds</Menu.Item>
                <Menu.Item>+</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default Header;