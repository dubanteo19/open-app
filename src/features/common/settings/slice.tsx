import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface SettingsState {
  darkMode: boolean;
  enableAI: boolean;
  language: string;
}
const initialState: SettingsState = {
  darkMode: false,
  enableAI: false,
  language: "en",
};
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleEnableAI(state) {
      state.enableAI = !state.enableAI;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const { setLanguage, toggleEnableAI, toggleDarkMode } =
  settingsSlice.actions;
