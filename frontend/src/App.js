import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Maps from "./components/Map/Maps";
import CarpenterHome from "./Home/CarpenterHome";
import WorkshopHome from "./Home/WorkshopHome";
import CarpentryDashboard from "./components/DashBoard/CapentryDashboard";
import DashboardMain from "./components/DashBoard/DashboardMain";
import NewProductForm from "./components/NewProductForm";
import ShowItems from "./components/Items/ShowItems";
import PendingApproval from "./components/Items/PendingApproval";
import Approved from "./components/Items/Approved";
import Rejected from "./components/Items/Rejected";
import CapenterList from "./components/Items/CapenterList";
import WorkshopDashboard from "./components/DashBoard/WorkshopDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/carpenter",
      element: <CarpenterHome />,
    },
    {
      path: "/capenter/dashboard",
      element: <CarpentryDashboard />,
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
      path: "/workshop",
      element: <WorkshopHome />,
    },

    {
      path: "/workshop/dashboard",
      element: <WorkshopDashboard />,
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
