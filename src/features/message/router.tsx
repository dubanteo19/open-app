import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Navigate, RouteObject } from "react-router-dom";
import { ChatLayout } from "./layouts/ChatLayout";
import { ChatWindow } from "./pages/ChatWindow";

export const chatRouter: RouteObject = {
  path: "/messages",
  element: (
    <ProtectedRoute>
      <ChatLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"conversations"} /> },
    { path: "conversations/:conversationId", element: <ChatWindow /> },
    { path: "conversations", element: <ChatWindow /> },
  ],
};
