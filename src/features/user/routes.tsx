import { UserLayout } from "@/components/layout/UserLayout";
import { ProtectedRoute } from "@/routes/ProutectedRoute";
import { Navigate, RouteObject } from "react-router-dom";
import { NotificationsPage } from "./notifications/pages/NotificationsPage";
import { ProfilePage } from "./profile/pages/ProfilePage";

export const userRoutes: RouteObject = {
  path: "/user",
  element: (
    <ProtectedRoute>
      <UserLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"profile"} /> },
    { path: "profile", index: true, element: <ProfilePage /> },
    { path: "notifications", element: <NotificationsPage /> },
  ],
};
