import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from '@/types/settings';

const initialState: UserSettings = {
  theme: 'light',
  lang: 'ko',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // 💡 [과제 2] 테마를 토글하는 기능을 완성하세요 (light <-> dark)
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    // 💡 [과제 3] 외부에서 전달받은 값(payload)으로 언어를 변경하세요
    setLanguage: (state, action: PayloadAction<UserSettings['lang']>) => {
      state.lang = action.payload;
    },
  },
});

export const { toggleTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
