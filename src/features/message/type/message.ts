import { User } from "@/types/user";

export enum MessageState {
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  ERROR = "ERROR",
}
export interface Message {
  id: number;
  conversationId: number;
  sender: User;
  content: string;
  createdAt: string;
}
