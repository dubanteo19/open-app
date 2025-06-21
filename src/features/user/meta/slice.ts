import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  unreadNotificationCount: 0,
  unseenConversationCount: 0,
};

const userMetaSlice = createSlice({
  name: "userMeta",
  initialState,
  reducers: {
    setUnreadNotificationCount(state, action) {
      state.unreadNotificationCount = action.payload;
    },
    setUnseenConversationCount(state, action) {
      state.unseenConversationCount = action.payload;
    },
    incrementUnreadNotification(state) {
      state.unreadNotificationCount += 1;
    },
  },
});
export default userMetaSlice.reducer;
export const {
  setUnreadNotificationCount,
  incrementUnreadNotification,
  setUnseenConversationCount,
} = userMetaSlice.actions;
