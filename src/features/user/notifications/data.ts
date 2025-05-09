import { User } from "@/types/user";

export const users: User[] = [
    {
        id: 1,
        displayName: "Alice Johnson",
        avatarUrl: "https://randomuser.me/api/portraits/men/19.jpg",
        username: "alicej",
        verified: true,
    },
    {
        id: 2,
        displayName: "Bob Smith",
        avatarUrl: "https://randomuser.me/api/portraits/men/20.jpg",
        username: "bobsmith",
        verified: false,
    },
    {
        id: 3,
        displayName: "Charlie Brown",
        avatarUrl: "https://randomuser.me/api/portraits/men/21.jpg",
        username: "charlieb",
        verified: true,
    },
];

export const notifications = [
    {
        id: 1,
        sender: users[0],
        receiver: users[1],
        createdAt: "2025-04-11T10:00:00Z",
        content: "Alice đã gửi một tin nhắn mới cho bạn.",
        isRead: false,
    },
    {
        id: 2,
        sender: users[1],
        receiver: users[0],
        createdAt: "2025-04-10T14:30:00Z",
        content: "Bob đã like bài viết của bạn.",
        isRead: true,
    },
    {
        id: 3,
        sender: users[2],
        receiver: users[1],
        createdAt: "2025-04-09T16:45:00Z",
        content: "Charlie đã bình luận về bài viết của bạn.",
        isRead: false,
    },
];