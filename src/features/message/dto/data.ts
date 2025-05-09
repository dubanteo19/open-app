import { User } from "@/types/user";
import { Conversation, ConversationDetail, Message } from "./ConversationInfo";

export const users: User[] = [
  {
    id: 1,
    displayName: "John Lee",
    avatarUrl: "https://github.com/john.png",
    username: "johnlee",
    verified: true,
  },
  {
    id: 2,
    displayName: "Alice Johnson",
    avatarUrl: "https://github.com/alice.png",
    username: "alicej",
    verified: false,
  },
  {
    id: 3,
    displayName: "David Lee",
    avatarUrl: "https://github.com/david.png",
    username: "davidlee",
    verified: true,
  },
  {
    id: 4,
    displayName: "Emily Clark",
    avatarUrl: "https://github.com/emily.png",
    username: "emilyclark",
    verified: false,
  },
  {
    id: 5,
    displayName: "Bob Smith",
    avatarUrl: "https://github.com/bob.png",
    username: "bobsmith",
    verified: true,
  },
];

export const conversationList: Conversation[] = [];
export const conversationDetailList: ConversationDetail[] = [2, 3, 4, 5].map((userId, idx) => {
  const currentUser = users[0];
  const otherUser = users.find(u => u.id === userId)!;
  const conversationId = idx + 1;

  const messageList: Message[] = Array.from({ length: 20 }, (_, i) => {
    const sender = i % 2 === 0 ? currentUser : otherUser;
    const prefix = sender.id === currentUser.id ? "A" : "B";
    return {
      id: i + 1,
      conversationId,
      sender,
      content: `${prefix}: Đây là nội dung tin nhắn thứ ${i + 1} giữa ${currentUser.displayName} và ${otherUser.displayName}đâsdadsabmmnbnnbnmbnmbmnbmbmnđâsdadsabmmnbnnbnmbnmbmnbmbmnđâsdadsabmmnbnnbnmbnmbmnbmbmnđâsdadsabmmnbnnbnmbnmbmnbmbmnđâsdadsabmmnbnnbnmbnmbmnbmbmn`,
      time: new Date(Date.now() - (i + idx * 10) * 60000).toISOString(),
      isGroup: false,
      state: i % 3 === 0 ? "read" : "sent"
    };
  });

  const lastMessage = messageList[messageList.length - 1];

  const conversation: Conversation = {
    id: conversationId,
    name: otherUser.displayName,
    lastMessage,
    avatar: otherUser.avatarUrl,
    unread: idx % 2 === 0,
    isGroup: false,
    memberName: otherUser.displayName
  };

  // Push to conversationList
  conversationList.push(conversation);

  return {
    conversation,
    memberList: [currentUser, otherUser],
    messageList
  };
});

