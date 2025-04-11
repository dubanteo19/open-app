import { AdminLayout } from "@/components/layout/AdminLayout";
import { RoleRoute } from "@/routes/RoleRoute";
import { Navigate, RouteObject } from "react-router-dom";
import { AdminDashBoardPage } from "./dashboard/pages/AdminDashBoardPage";
import { UserManagement } from "./users/pages/UserManagement";
import { PostManagement } from "./users/pages/PostManagement";

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <RoleRoute allowedRoles={["ADMIN"]}>
      <AdminLayout />
    </RoleRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"dashboard"} /> },
    { path: "dashboard", element: <AdminDashBoardPage /> },
    { path: "users", element: <UserManagement /> },
    { path: "posts", element: <PostManagement /> },
  ],
};
