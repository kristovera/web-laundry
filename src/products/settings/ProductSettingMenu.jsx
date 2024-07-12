import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_PRODUCTS, READ_PRODUCTS } from "../states/constants";
import { NavLink } from "react-bootstrap";

const ProductSettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[READ_PRODUCTS, CREATE_PRODUCTS]}
      or={true}
    >
      <li className="nav-item">
        <ManagerWidgetRBAC context={context} permissions={[READ_PRODUCTS]}>
          <NavLink className="d-flex align-items-center" href="#products">
            Products
          </NavLink>
        </ManagerWidgetRBAC>
      </li>
    </ManagerWidgetRBAC>
  );
};

export default ProductSettingMenu;
