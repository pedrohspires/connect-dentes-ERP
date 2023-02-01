import { useRoutes } from "react-router-dom";
import LayoutPage from "../Components/LayoutPage";
import Login from "../Pages/Login";

function Router() {
  const routes = [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <LayoutPage />,
      children: [
        
      ]
    }
  ];

  return useRoutes(routes);
}

export default Router