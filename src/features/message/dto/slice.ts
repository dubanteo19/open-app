import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation, Message } from "./ConversationInfo";
import { conversationList } from "./data";


interface ChatStore {
    conversationList: Conversation[];
    conversationId: number | null;
}

const initialState: ChatStore = {
    conversationId: null,
    conversationList: conversationList,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        openChatContent(state, action: PayloadAction<number>) {
            const conversationId = action.payload;
            state.conversationId = conversationId;
        
            // Cập nhật lại trong danh sách để clear unread
            state.conversationList = state.conversationList.map(c => {
                if (c.id === conversationId) {
                    return {
                        ...c,
                        unread: false,
                    };
                }
                return c;
            });
        },

        updateConversationWithNewMessage(
        state,
        action: PayloadAction<{ conversationId: number; message: Message }>
        ) {
        const { conversationId, message } = action.payload;
        const existing = state.conversationList.find(c => c.id === conversationId);
        if (existing) {
            const isCurrentOpen = state.conversationId === conversationId;
        
            // Cập nhật lastMessage
            const updated = {
                ...existing,
                lastMessage: message,
                unread: isCurrentOpen ? false : true,
            };
        
            // Di chuyển lên đầu
            state.conversationList = [
                updated,
                ...state.conversationList.filter(c => c.id !== conversationId),
            ];
        }
        },
        setConversationList(state, action: PayloadAction<Conversation[]>) {
        state.conversationList = action.payload;
        }
    },
})



export default chatSlice.reducer;
export const { openChatContent, updateConversationWithNewMessage, setConversationList } = chatSlice.actions;