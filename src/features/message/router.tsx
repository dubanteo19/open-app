import { ProtectedRoute } from "@/routes/ProutectedRoute";
import { Navigate, RouteObject } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";

export const chatRouter: RouteObject = {
    path: "/",
    element: (
        <ProtectedRoute>
            <ChatPage/>
        </ProtectedRoute>
    ),
    children: [
        { index: true, element: <Navigate to={"message"} /> },
        {path: "message", element: <ChatPage />},
        {path: "message/:conversationId", element: <ChatPage />},
        // {path: "chat/:userId", index: true, element: <ChatPage />},
    ],
}