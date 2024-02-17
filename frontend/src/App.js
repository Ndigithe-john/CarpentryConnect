import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./components/Home";
import Maps from "./components/Map/Maps";
import Dashboard from "./components/Dashboard";
import NewProductFrom from "./components/NewProductForm";
import ShowItems from "./components/Items/ShowItems";
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
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
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
      path: "/addItem",
      element: <NewProductFrom />,
    },
    {
      path: "/showItems",
      element: <ShowItems />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
