import { RouteObject } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Register } from "@/features/auth/pages/RegisterPage";

export const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
];
