import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import useAPI from "../../utils/hooks/useAPI";
import useAccess from "../../utils/hooks/useAccess";
import { Route, Routes } from "react-router-dom";
import { CREATE_ORDERS, READ_ORDERS } from "../states/constants";
import ManagerWidgetLayoutProtected from "../../managers/widgets/ManagerWidgetLayoutProtected";
import OrderPageList from "../pages/OrderPageList";
import ManagerPage403 from "../../managers/pages/ManagerPage403";
import ManagerPage404 from "../../managers/pages/ManagerPage404";
import { READ_PRODUCTS } from "../../products/states/constants";
import OrderPageCreate from "../pages/OrderPageCreate";

const OrderSettingRouter = () => {
  const context = useContext(UtilStateContextBase);
  const api = useAPI();
  const access = useAccess(context, api);

  useEffect(() => {
    access.verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.auth.isAuthenticated]);

  return (
    <Routes>
      <Route
        index
        element={
          access.has(
            [READ_ORDERS],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <OrderPageList />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />

      <Route
        path="new"
        element={
          access.has(
            [CREATE_ORDERS, READ_PRODUCTS],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <OrderPageCreate />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />

      <Route
        path="*"
        element={
          <ManagerWidgetLayoutProtected>
            <ManagerPage404 />
          </ManagerWidgetLayoutProtected>
        }
      />
    </Routes>
  );
};

export default OrderSettingRouter;
