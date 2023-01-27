import { useRoutes } from "react-router-dom";
import Login from "../Pages/Login";

function Router() {
  const routes = [
    {
      path: "/login",
      element: <Login />
    }
  ];

  return useRoutes(routes);
}

export default Router