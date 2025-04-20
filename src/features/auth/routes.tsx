import { RouteObject } from "react-router-dom";
import { GuestOnlyRoute } from "./guestOnlyRoute";
import { LoginPage } from "./pages/LoginPage";
import { Register } from "./pages/RegisterPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <GuestOnlyRoute>
        <LoginPage />
      </GuestOnlyRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestOnlyRoute>
        <Register />
      </GuestOnlyRoute>
    ),
  },
];
