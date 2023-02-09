import { useRoutes } from "react-router-dom";
import LayoutPage from "../Components/LayoutPage";
import Atendimento from "../Pages/Atendimento";
import Cliente from "../Pages/Cliente";
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
        },
        {
          path: "/Cliente",
          element: <Cliente />
        }
      ]
    }
  ];

  return useRoutes(routes);
}

export default Router