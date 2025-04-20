import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface EditPostState {
  showDialog: boolean;
  content?: string;
  postId: number;
}
const initialState: EditPostState = {
  showDialog: false,
  content: "",
  postId: 0,
};
const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openDialog(
      state,
      action: PayloadAction<{ content: string; postId: number }>,
    ) {
      state.showDialog = true;
      state.postId = action.payload.postId;
      state.content = action.payload.content;
    },
    changeContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    closeDialog() {
      return initialState;
    },
  },
});

export default postSlice.reducer;
export const { openDialog, closeDialog, changeContent } = postSlice.actions;
