import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type CallState = "idle" | "incoming" | "active" | "calling";
interface CallInfo {
  callState: CallState;
  remoteUsername: string | null;
  sdp: string | null;
}
const initialState: CallInfo = {
  callState: "idle",
  remoteUsername: null,
  sdp: null,
};
const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setCallState(state, action: PayloadAction<CallState>) {
      state.callState = action.payload;
    },
    setRemoteUsername(state, action: PayloadAction<string>) {
      state.remoteUsername = action.payload;
    },
    setSdp(state, action: PayloadAction<string>) {
      state.sdp = action.payload;
    },
    resetCallState: () => initialState,
  },
});

export default callSlice.reducer;
export const { setCallState, resetCallState, setRemoteUsername, setSdp } =
  callSlice.actions;
