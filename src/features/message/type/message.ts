import { User } from "@/types/user";

export enum MessageState {
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  ERROR = "ERROR",
}

export interface MessageCreateRequest {
  conversationId:number;
  receiver: number;
  content: string;
}
export interface Message {
  id: number;
  conversationId: number;
  sender: User;
  content: string;
  createdAt: string;
}
