import { Container, Nav, NavDropdown } from "react-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts.jsx";
import PermissionSettingMenu from "../../permissions/settings/PermissionSettingMenu.jsx";
import RoleSettingMenu from "../../roles/setttings/RoleSettingMenu.jsx";
import UserSettingMenu from "../../users/settings/UserSettingMenu.jsx";
import ProductSettingMenu from "../../products/settings/ProductSettingMenu.jsx";
import OrderSettingMenu from "../../orders/settings/OrderSettingMenu.jsx";

function ManagerNavigationBase() {
  const context = useContext(UtilStateContextBase);

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">POS Lite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Dashboard</Nav.Link>
            <PermissionSettingMenu />
            <RoleSettingMenu />
            <UserSettingMenu />
            <ProductSettingMenu />
            <OrderSettingMenu />
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  context.auth.signOut();
                }}
              >
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ManagerNavigationBase;
