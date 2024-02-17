import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./components/Home";
import Maps from "./components/Map/Maps";
import Dashboard from "./components/DashBoard/Dashboard";
import DashboardMain from "./components/DashBoard/DashboardMain";
import NewProductForm from "./components/NewProductForm";
import ShowItems from "./components/Items/ShowItems";
import PendingApproval from "./components/Items/PendingApproval";
import Approved from "./components/Items/Approved";
import Rejected from "./components/Items/Rejected";
import CapenterList from "./components/Items/CapenterList";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          index: "index",
          element: (
            <>
              <DashboardMain />
            </>
          ),
        },
        {
          path: "addItem",
          element: <NewProductForm />,
        },
        {
          path: "items",
          element: <ShowItems />,
        },
        {
          path: "pendingApproval",
          element: <PendingApproval />,
        },
        {
          path: "approved",
          element: <Approved />,
        },
        {
          path: "rejected",
          element: <Rejected />,
        },
        {
          path: "capenterslist",
          element: <CapenterList />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/signup",
      element: <RegisterPage />,
    },
    {
      path: "/map",
      element: <Maps />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
