import { useRoutes } from "react-router-dom";
import LayoutPage from "../Components/LayoutPage";
import Atendimento from "../Pages/Atendimento";
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
        {
          path: "/",
          element: <Atendimento />
        },
        {
          path: "/Atendimento",
          element: <Atendimento />
        }
      ]
    }
  ];

  return useRoutes(routes);
}

export default Router