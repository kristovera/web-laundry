import { useContext } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import { CREATE_CATEGORY, READ_CATEGORY} from "../states/constants";
import { NavDropdown } from "react-bootstrap";

const CategorySettingMenu = () => {
  const context = useContext(UtilStateContextBase);

  return (
    <ManagerWidgetRBAC
      context={context}
      permissions={[CREATE_CATEGORY, READ_CATEGORY]}
      or={true}
    >
      <NavDropdown title="Category Manager">
        <ManagerWidgetRBAC context={context} permissions={[READ_CATEGORY]}>
          <NavDropdown.Item href="#category">Category</NavDropdown.Item>
        </ManagerWidgetRBAC>
      </NavDropdown>
    </ManagerWidgetRBAC>
  );
};

export default CategorySettingMenu;
