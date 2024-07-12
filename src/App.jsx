import useAuth from "./utils/hooks/useAuth.jsx";
import { UtilStateContextBase } from "./utils/states/contexts";
import { HashRouter, Route, Routes } from "react-router-dom";
import PermissionSettingRouter from "./permissions/settings/PermissionSettingRouter.jsx";
import RoleSettingRouter from "./roles/setttings/RoleSettingRouter.jsx";
import UserSettingRouter from "./users/settings/UserSettingRouter.jsx";
import DashboardSettingRouter from "./dashboards/settings/DashboardSettingRouter.jsx";
import ProductSettingRouter from "./products/settings/ProductSettingRouter.jsx";
import OrderSettingRouter from "./orders/settings/OrderSettingRouter.jsx";

function App() {
  const auth = useAuth();

  return (
    <UtilStateContextBase.Provider value={{ auth }}>
      <HashRouter>
        <Routes>
          <Route path={"/*"} element={<DashboardSettingRouter />} />
          <Route
            path={"/permissions/*"}
            element={<PermissionSettingRouter />}
          />
          <Route path={"/roles/*"} element={<RoleSettingRouter />} />
          <Route path={"/users/*"} element={<UserSettingRouter />} />
          <Route path={"/products/*"} element={<ProductSettingRouter />} />
          <Route path={"/orders/*"} element={<OrderSettingRouter />} />
        </Routes>
      </HashRouter>
    </UtilStateContextBase.Provider>
  );
}

export default App;
