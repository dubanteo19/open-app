import { Message } from "./message";

export interface Conversation {
  id: number;
  name: string;
  receiverId: number;
  lastMessage?: Message;
  avatar?: string;
  unread: boolean;
}
