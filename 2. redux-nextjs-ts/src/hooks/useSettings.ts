import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { toggleTheme, setLanguage } from '@/store/settingsSlice';
import { Theme, Lang } from '@/types/settings';

export function useSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const lang = useSelector((state: RootState) => state.settings.lang);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSetTheme = (newTheme: Theme) => {
    if (theme !== newTheme) {
      dispatch(toggleTheme());
    }
  };

  const handleToggleLang = () => {
    dispatch(setLanguage(lang === 'ko' ? 'en' : 'ko'));
  };

  const handleSetLang = (newLang: Lang) => {
    dispatch(setLanguage(newLang));
  };

  return {
    theme,
    lang,
    toggleTheme: handleToggleTheme,
    setTheme: handleSetTheme,
    toggleLang: handleToggleLang,
    setLang: handleSetLang,
  };
}
