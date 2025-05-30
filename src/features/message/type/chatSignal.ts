export type ChatSignalType = "TYPING" | "READ";
export interface ChatSignal {
  from: string;
  to: string;
  type: ChatSignalType;
  conversationId: number;
}
