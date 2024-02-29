import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import UserDetails from "../pages/UserDetails";
import SignUp from "../features/auth/SignUp";
import SignIn from "../features/auth/SignIn";
import ResetPassword from "../features/auth/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Notifications from "../pages/Notifications";
import Friends from "../pages/Friends";
import Settings from "../pages/Settings";
import Auth from "../services/Auth";
import PostDetails from "../pages/PostDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile/:userId",
        element: <UserDetails />,
      },
      {
        path: "/posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/signin",
    element: (
      <Auth>
        <SignIn />,
      </Auth>
    ),
  },
  {
    path: "/signup",
    element: (
      <Auth>
        <SignUp />,
      </Auth>
    ),
  },
  {
    path: "/resetpassword",
    element: (
      <Auth>
        <ResetPassword />,
      </Auth>
    ),
  },
]);
