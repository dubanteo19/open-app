import { Message } from "./message";

export interface Conversation {
  id: number;
  name: string;
  lastMessage: Message;
  avatar?: string;
  unread: boolean;
  memberName?: string;
}
