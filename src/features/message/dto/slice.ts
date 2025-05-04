import { createSlice } from "@reduxjs/toolkit";
import { Conversation, ConversationDetail } from "./ConversationInfo";


interface ChatStore {
    conversationList: Conversation[];
    showChatContent: boolean;
    chatContent: ConversationDetail | null;
}

const initialState: ChatStore = {
    showChatContent: false,
    conversationList: [],
    chatContent: null,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        openChatContent(state, action) {
            state.showChatContent = action.payload;
        },
        // setMessageList(state, action) {
        //     state.messageList = action.payload;
        // },
    },
})

export default chatSlice.reducer;
export const { openChatContent } = chatSlice.actions;