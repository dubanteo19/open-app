import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationSummary } from "./type/conversation";
import { Message } from "./type/message";
import { ChatSignal } from "./type/chatSignal";

interface ChatState {
  conversations: ConversationSummary[];
  chatSignal: ChatSignal | null;
  messagesByConversation: {
    [conversationId: number]: Message[];
  };
  selectedConversationId: number | null;
}
const initialState: ChatState = {
  conversations: [],
  chatSignal: null,
  messagesByConversation: {},
  selectedConversationId: null,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations(state, action: PayloadAction<ConversationSummary[]>) {
      state.conversations = action.payload;
    },
    setSelectedConversationId(state, action: PayloadAction<number>) {
      state.selectedConversationId = action.payload;
    },
    setChatSignal(state, action: PayloadAction<ChatSignal | null>) {
      state.chatSignal = action.payload;
    },
    setMessagesForConversation(
      state,
      action: PayloadAction<{ conversationId: number; messages: Message[] }>,
    ) {
      const conversationId = action.payload.conversationId;
      const messages = action.payload.messages;
      state.messagesByConversation[conversationId] = messages;
    },
    addMessageToConversation(state, action: PayloadAction<Message>) {
      const message = action.payload;
      const { conversationId } = action.payload;
      if (!state.messagesByConversation[conversationId])
        state.messagesByConversation[conversationId] = [];
      state.messagesByConversation[conversationId].push(message);
      const index = state.conversations.findIndex(
        (c) => c.id === message.conversationId,
      );
      if (index !== -1) {
        state.conversations[index].lastMessageContent = message.content;
        state.conversations[index].lastMessageSentAt = message.createdAt;
      }
    },
  },
});

export default chatSlice.reducer;
export const {
  addMessageToConversation,
  setConversations,
  setSelectedConversationId,
  setMessagesForConversation,
  setChatSignal,
} = chatSlice.actions;
