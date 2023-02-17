import { useRoutes } from "react-router-dom";
import LayoutPage from "../Components/LayoutPage";
import Agendamento from "../Pages/Agendamento";
import Atendimento from "../Pages/Atendimento";
import Cliente from "../Pages/Cliente";
import Dashboard from "../Pages/Dashboard";
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
          element: <Dashboard />
        },
        {
          path: "/Dashboard",
          element: <Dashboard />
        },
        {
          path: "/Atendimento",
          element: <Atendimento />
        },
        {
          path: "/Cliente",
          element: <Cliente />
        },
        {
          path: "/Agendamento",
          element: <Agendamento />
        }
      ]
    }
  ];

  return useRoutes(routes);
}

export default Router