export type Theme = 'light' | 'dark';

export type Lang = 'ko' | 'en';

// 💡 [과제 1] 아래 타입을 완성하세요.
export interface UserSettings {
  theme: 'light' | 'dark'; // 'light' 또는 'dark'만 가능하도록 리터럴 타입 적용
  lang: 'ko' | 'en'; // 'ko' 또는 'en'만 가능하도록 리터럴 타입 적용
}
