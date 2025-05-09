import { adminRoutes } from "@/features/admin/routes";
import { authRoutes } from "@/features/auth/routes";
import { publicRoutes } from "@/features/public/routes";
import { userRoutes } from "@/features/user/routes";
import { useRoutes } from "react-router-dom";
import { chatRouter } from "@/features/message/router";

export const AppRoutes = () => {
  const routes = useRoutes([
    ...publicRoutes,
    ...authRoutes,
    userRoutes,
    chatRouter,
    adminRoutes,
  ]);
  return routes;
};
