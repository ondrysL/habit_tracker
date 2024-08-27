import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthPage from "../pages/AuthPage";
import PrivateRouter from "./PrivateRouter";
import HomePage from "../pages/HomePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <AuthPage />
      },
      {
        path: "sign-up",
        element: <AuthPage />
      },
      {
        path: "/homepage",
        element: <PrivateRouter>
          <HomePage />
        </PrivateRouter>
      }
    ]
  }
])

export default router
