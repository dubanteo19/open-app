import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UnAuthorizedPage } from "./pages/UnAuthorizedPage";
import { UserLayout } from "@/components/layout/UserLayout";

export const publicRoutes: RouteObject[] = [
  { path: "unauthorized", element: <UnAuthorizedPage /> },
  {
    path: "*",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <NotFoundPage />,
      },
    ],
  },
];
