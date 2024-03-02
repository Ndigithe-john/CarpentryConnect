import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Maps from "./components/Map/Maps";
import DashboardMain from "./components/DashBoard/DashboardMain";
import NewProductForm from "./components/NewProductForm";
import ShowItems from "./components/Items/ShowItems";
import PendingApproval from "./components/Items/PendingApproval";
import Approved from "./components/Items/Approved";
import Rejected from "./components/Items/Rejected";
import CapenterList from "./components/Items/CapenterList";
import Home from "./components/Home";
import Dashboard from "./components/DashBoard/Dashboard";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import ProductDetails from "./components/ProductDetails";
import UpdateProfile from "./pages/UpdateProfile";
import LocationMap from "./components/Location/LocationMap";
import Location from "./components/Location/Location";
function App() {
  const updateUserRole = (role) => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
  };
  const initialUserRole = localStorage.getItem("userRole") || "";
  const [userRole, setUserRole] = useState(initialUserRole);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <Home userRole={userRole} />,
    },
    {
      path: "/item/:ItemID",
      element: <ProductDetails userRole={userRole} />,
    },
    { path: "user/:UserId", element: <ProfilePage userRole={userRole} /> },
    {
      path: "/profile",
      element: <ProfilePage userRole={userRole} />,
      children: [
        {
          index: "index",
          element: <></>,
        },
        {
          path: "editProfile",
          element: <UpdateProfile />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard userRole={userRole} />,
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
          element: <NewProductForm userRole={userRole} />,
        },
        {
          path: "items",
          element: <ShowItems userRole={userRole} />,
        },
        {
          path: "pendingApproval",
          element: <PendingApproval userRole={userRole} />,
        },
        {
          path: "approved",
          element: <Approved userRole={userRole} />,
        },
        {
          path: "rejected",
          element: <Rejected userRole={userRole} />,
        },
        {
          path: "capenterslist",
          element: <CapenterList userRole={userRole} />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage updateUserRole={updateUserRole} />,
    },
    {
      path: "/signup",
      element: <RegisterPage />,
    },
    {
      path: "/map",
      element: <Maps />,
    },
    {
      path: "location",
      element: <LocationMap />,
    },
    {
      path: "/mapps",
      element: <Location />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

// {
//   path: "/workshop",
//   element: <WorkshopHome />,
// },

// {
//   path: "/workshop/dashboard",
//   element: <WorkshopDashboard />,
//   children: [
//     {
//       index: "index",
//       element: (
//         <>
//           <DashboardMain />
//         </>
//       ),
//     },
//     {
//       path: "addItem",
//       element: <NewProductForm />,
//     },
//     {
//       path: "items",
//       element: <ShowItems />,
//     },
//     {
//       path: "pendingApproval",
//       element: <PendingApproval />,
//     },
//     {
//       path: "approved",
//       element: <Approved />,
//     },
//     {
//       path: "rejected",
//       element: <Rejected />,
//     },
//     {
//       path: "capenterslist",
//       element: <CapenterList />,
//     },
//   ],
// },
