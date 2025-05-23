import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface openerMetaState {
  likedPostIds: number[];
}
const initialState: openerMetaState = {
  likedPostIds: [],
};
const openerMetaSlice = createSlice({
  name: "openerMeta",
  initialState,
  reducers: {
    setLikedPostIds(state, action: PayloadAction<number[]>) {
      state.likedPostIds = action.payload;
    },
  },
});

export default openerMetaSlice.reducer;
export const { setLikedPostIds } = openerMetaSlice.actions;
