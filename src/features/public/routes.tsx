import { RouteObject } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UnAuthorizedPage } from "./pages/UnAuthorizedPage";
import { UserLayout } from "@/components/layout/UserLayout";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <UserLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: "unauthorized", element: <UnAuthorizedPage /> },
  { path: "*", element: <NotFoundPage /> },
];
