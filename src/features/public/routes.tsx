import { RouteObject } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UnAuthorizedPage } from "./pages/UnAuthorizedPage";

export const publicRoutes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "unauthorized", element: <UnAuthorizedPage /> },
  { path: "*", element: <NotFoundPage /> },
];
