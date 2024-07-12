import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_ORDERS, READ_ORDERS } from "../states/constants";
import { NavLink } from "react-bootstrap";

const OrderSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_ORDERS, CREATE_ORDERS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_ORDERS]}>
          <NavLink className="d-flex align-items-center" href="#orders">
            Orders
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default OrderSettingMenu;
