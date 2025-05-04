import { User } from "@/types/user";

export interface Conversation {
    id: number;
    name: string;
    lastMessage: Message;
    avatar?: string;
    unread: boolean;
    isGroup: boolean;
    memberName?: string;
  }

export interface Message {
    id: number;
    conversationId: number;
    sender: User;
    content: string;
    time: string;
    isGroup: boolean;
    state?: string;// MessageState
    // emoji?: string;
}

export interface ConversationDetail {
    conversation: Conversation;
    memberList: User[];
    messageList: Message[];// 20 tin nhan
}

export enum MessageState {
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  ERROR = "ERROR",
}