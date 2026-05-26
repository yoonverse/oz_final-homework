'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme, setLanguage } from '@/store/settingsSlice';

export default function Home() {
  const dispatch = useDispatch();

  // 💡 [과제 6] 현재 선택된 언어(lang)를 가져와서 조건부 렌더링을 구현하세요.
  const { lang, theme } = useSelector((state: RootState) => state.settings);

  // Localized texts for the premium cards
  const translations = {
    ko: {
      cardQuickTitle: '⚙️ 빠른 설정 제어판',
      cardQuickDesc: '스위치와 버튼을 사용해 대시보드의 전역 테마와 다국어 처리를 실시간으로 제어합니다.',
      themeToggleLabel: '다크 모드 활성화',
      themeToggleDesc: '다크 테마와 라이트 테마를 토글합니다.',
      langToggleLabel: '기본 언어 설정',
      langToggleDesc: '대시보드의 모든 텍스트를 즉시 번역합니다.',
      cardSummaryTitle: '📊 전역 상태 요약 (Redux + Persist)',
      cardSummaryDesc: '이 설정 정보는 브라우저의 localStorage에 안전하게 보관되어 새로고침 후에도 유지됩니다.',
      stateKeyTheme: '테마 상태',
      stateKeyLang: '언어 상태',
      stateKeyPersist: 'Persist 활성화',
      activeStatus: '동작 중',
      architectureTitle: '🛠️ 아키텍처 및 구현 하이라이트',
      feat1Title: 'Redux Persist 통합',
      feat1Desc: 'SSR의 hydration mismatch를 우려하지 않는 정교한 localStorage 래퍼 연동',
      feat2Title: '정적 타이핑 완비',
      feat2Desc: 'TypeScript 리터럴 타입 및 UserSettings 전역 인터페이스 적용',
      feat3Title: '통합 Custom Hook',
      feat3Desc: 'useSettings 훅을 통해 selector와 dispatch 액션을 하나의 함수로 추상화',
      feat4Title: 'Next.js App Router',
      feat4Desc: '레이아웃과 테마 래퍼의 컴포넌트화를 통한 깔끔한 페이지 컴포지션'
    },
    en: {
      cardQuickTitle: '⚙️ Quick Preferences Panel',
      cardQuickDesc: 'Toggle settings instantly and watch the entire layout react in real-time.',
      themeToggleLabel: 'Enable Dark Mode',
      themeToggleDesc: 'Toggle between dark and light color palettes.',
      langToggleLabel: 'Primary Language',
      langToggleDesc: 'Instantly translate every piece of text in this dashboard.',
      cardSummaryTitle: '📊 Global State Overview (Redux + Persist)',
      cardSummaryDesc: 'These properties are kept secure within localStorage and survive page reloads.',
      stateKeyTheme: 'Theme Mode',
      stateKeyLang: 'Language Code',
      stateKeyPersist: 'Persist Status',
      activeStatus: 'Active',
      architectureTitle: '🛠️ Architecture & Implementation Highlights',
      feat1Title: 'Redux Persist Core',
      feat1Desc: 'Engineered safe storage layers to bypass Next.js SSR hydration crashes',
      feat2Title: 'Full Static Typing',
      feat2Desc: 'TypeScript literal shapes and strict UserSettings contract declarations',
      feat3Title: 'Unified Custom Hook',
      feat3Desc: 'Consolidated selector queries and dispatches inside a single clean useSettings hook',
      feat4Title: 'Next.js App Router',
      feat4Desc: 'Segmented layout layouts, Providers wrapping, and localized client-boundaries'
    }
  };

  const t = translations[lang];

  return (
    <main className="main-content" style={{ padding: '0 1rem' }}>
      <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {lang === 'ko' ? '환영합니다!' : 'Welcome!'}
        </h1>
        <p className="dashboard-subtitle" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          전역 상태 관리 대시보드 메인 페이지입니다.
        </p>
      </header>

      {/* Grid Layout */}
      <section className="card-grid">
        {/* Left Main Card: Preferences */}
        <div className="card">
          <h2 className="card-title">{t.cardQuickTitle}</h2>
          <p className="card-description">{t.cardQuickDesc}</p>

          <div className="action-box">
            {/* Theme Action row */}
            <div className="action-row">
              <div className="action-label">
                <span>{t.themeToggleLabel}</span>
                <span className="action-label-desc">{t.themeToggleDesc}</span>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={() => dispatch(toggleTheme())}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Language Action row */}
            <div className="action-row">
              <div className="action-label">
                <span>{t.langToggleLabel}</span>
                <span className="action-label-desc">{t.langToggleDesc}</span>
              </div>
              
              <div className="segmented-control">
                <button
                  onClick={() => dispatch(setLanguage('ko'))}
                  className={`segmented-control-btn ${lang === 'ko' ? 'active' : ''}`}
                >
                  KO
                </button>
                <button
                  onClick={() => dispatch(setLanguage('en'))}
                  className={`segmented-control-btn ${lang === 'en' ? 'active' : ''}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Secondary Card: Redux Summary */}
        <div className="card">
          <h2 className="card-title">{t.cardSummaryTitle}</h2>
          <p className="card-description">{t.cardSummaryDesc}</p>

          <div className="settings-display-grid">
            <div className="settings-item">
              <span className="settings-key">{t.stateKeyTheme}</span>
              <span className="settings-value" style={{ color: theme === 'dark' ? 'hsl(290, 90%, 65%)' : 'hsl(262, 80%, 50%)' }}>
                {theme}
              </span>
            </div>

            <div className="settings-item">
              <span className="settings-key">{t.stateKeyLang}</span>
              <span className="settings-value">
                {lang}
              </span>
            </div>

            <div className="settings-item">
              <span className="settings-key">{t.stateKeyPersist}</span>
              <div className="status-badge">
                <span className="status-dot"></span>
                <span>{t.activeStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid at Bottom */}
      <section className="card">
        <h2 className="card-title">{t.architectureTitle}</h2>
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon">💾</span>
            <h3 className="feature-name">{t.feat1Title}</h3>
            <p className="feature-desc">{t.feat1Desc}</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <h3 className="feature-name">{t.feat2Title}</h3>
            <p className="feature-desc">{t.feat2Desc}</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚓</span>
            <h3 className="feature-name">{t.feat3Title}</h3>
            <p className="feature-desc">{t.feat3Desc}</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌐</span>
            <h3 className="feature-name">{t.feat4Title}</h3>
            <p className="feature-desc">{t.feat4Desc}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
