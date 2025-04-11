import { UserLayout } from "@/components/layout/UserLayout";
import { ProtectedRoute } from "@/routes/ProutectedRoute";
import { Navigate, RouteObject } from "react-router-dom";
import { NotificationsPage } from "./notifications/pages/NotificationsPage";
import { ProfilePage } from "./profile/pages/ProfilePage";
import { FeedPage } from "./feed/pages/FeedPage";

export const userRoutes: RouteObject = {
  path: "/",
  element: (
    <ProtectedRoute>
      <UserLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"feed"} /> },
    { path: "feed", index: true, element: <FeedPage /> },
    { path: "profile", index: true, element: <ProfilePage /> },
    { path: "notifications", element: <NotificationsPage /> },
  ],
};
