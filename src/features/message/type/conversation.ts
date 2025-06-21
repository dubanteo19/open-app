import { Message } from "./message";

export interface Conversation {
  summary: ConversationSummary;
  messages: Message[];
}
export interface ConversationSummary {
  id: number;
  name: string;
  receiver: string;
  avatar?: string;
  unseenCount: number;
  lastMessageContent: string;
  lastMessageSentAt: string;
}
