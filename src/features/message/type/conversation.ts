import { Message } from "./message";

export interface Conversation {
  summary: ConversationSummary;
  messages: Message[];
}
export interface ConversationSummary {
  id: number;
  name: string;
  receiver: string;
  lastMessage?: Message;
  avatar?: string;
  unread: boolean;
}
