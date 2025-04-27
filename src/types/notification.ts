import { User } from "@/types/user";

export interface NotificationPayload {
    message: string;
}

export interface NotificationUpdateRequest {
    notificationId?: number;
    payload: NotificationPayload;
}

export interface NotificationCreateRequest {
    userId: number;
    payload: NotificationPayload;
}

export interface Notification {
    id: number;
    sender: User;
    receiver: User;
    createdAt: string;
    content: string;
    isRead: boolean;
}
