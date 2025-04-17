import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "./dto/response";
interface AuthState {
  user: UserResponse | null;
}
const initialState: AuthState = {
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export default authSlice.reducer;
export const { logout, setUser } = authSlice.actions;
