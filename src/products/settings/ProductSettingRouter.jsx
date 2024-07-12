import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import useAPI from "../../utils/hooks/useAPI";
import useAccess from "../../utils/hooks/useAccess";
import { Route, Routes } from "react-router-dom";
import ProductPageList from "../pages/ProductPageList";
import ManagerPage403 from "../../managers/pages/ManagerPage403";
import ManagerWidgetLayoutProtected from "../../managers/widgets/ManagerWidgetLayoutProtected";
import {
  CREATE_PRODUCTS,
  READ_PRODUCTS,
  UPDATE_PRODUCTS,
} from "../states/constants";
import ProductPageCreate from "../pages/ProductPageCreate";
import ProductPageUpdate from "../pages/ProductPageUpdate";

const ProductSettingRouter = () => {
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
            [READ_PRODUCTS],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <ProductPageList />
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
            [CREATE_PRODUCTS],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <ProductPageCreate />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />

      <Route
        path="update/:id"
        element={
          access.has(
            [UPDATE_PRODUCTS],
            context.auth.superuser,
            context.auth.accessList
          ) ? (
            <ManagerWidgetLayoutProtected>
              <ProductPageUpdate />
            </ManagerWidgetLayoutProtected>
          ) : (
            <ManagerWidgetLayoutProtected>
              <ManagerPage403 />
            </ManagerWidgetLayoutProtected>
          )
        }
      />
    </Routes>
    
    
  );
};

export default ProductSettingRouter;
