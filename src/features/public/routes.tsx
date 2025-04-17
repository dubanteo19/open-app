import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UnAuthorizedPage } from "./pages/UnAuthorizedPage";

export const publicRoutes: RouteObject[] = [
  { path: "unauthorized", element: <UnAuthorizedPage /> },
  { path: "*", element: <NotFoundPage /> },
];
