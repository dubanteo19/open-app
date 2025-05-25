import { UserLayout } from "@/components/layout/UserLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Navigate, RouteObject } from "react-router-dom";
import { NotificationsPage } from "./notifications/pages/NotificationsPage";
import { ProfilePage } from "./profile/pages/ProfilePage";
import { FeedPage } from "./feed/pages/FeedPage";
import { PostDetailPage } from "./feed/pages/PostDetailPage";
import { BookMarkPage } from "./bookmark/page";

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
    { path: ":username/post/:postId", element: <PostDetailPage /> },
    { path: "profile/:username", element: <ProfilePage /> },
    { path: "notifications", element: <NotificationsPage /> },
    { path: "bookmarks", element: <BookMarkPage /> },
  ],
};
