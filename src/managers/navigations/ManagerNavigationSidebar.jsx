import { FaTractor } from "react-icons/fa";
import PermissionSettingMenu from "../../permissions/settings/PermissionSettingMenu";
import RoleSettingMenu from "../../roles/setttings/RoleSettingMenu";
import UserSettingMenu from "../../users/settings/UserSettingMenu";
import { NavLink } from "react-bootstrap";
import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import OrderSettingMenu from "../../orders/settings/OrderSettingMenu";
import ProductSettingMenu from "../../products/settings/ProductSettingMenu";

const ManagerNavigationSidebar = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column mb-auto">
            <ProductSettingMenu />
            <OrderSettingMenu />
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>User Management</span>
          </h6>
          <ul className="nav flex-column mb-auto">
            <PermissionSettingMenu />
            <RoleSettingMenu />
            <UserSettingMenu />
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <FaTractor />
                Settings
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link d-flex align-items-center gap-2"
                onClick={() => {
                  context.auth.signOut();
                }}
              >
                <FaTractor />
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerNavigationSidebar;
