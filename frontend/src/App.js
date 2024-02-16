import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./components/Home";
import Maps from "./components/Map/Maps";
import Dashboard from "./components/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
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
