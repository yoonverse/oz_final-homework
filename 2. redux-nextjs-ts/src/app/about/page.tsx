'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function About() {
  const { lang, theme } = useSelector((state: RootState) => state.settings);

  // Localized texts
  const translations = {
    ko: {
      cardTechTitle: '💻 기술 명세서',
      cardTechDesc: '이 어플리케이션은 현대적이고 검증된 다음 기술들을 사용하여 완벽하게 구현되었습니다:',
      techItem1: 'Next.js App Router: 라우팅, 서버 컴포넌트 결합, 클라이언트 바운더리 관리',
      techItem2: 'Redux Toolkit + Persist: 슬라이스 관리 및 SSR 안전한 로컬 저장 처리',
      techItem3: 'TypeScript: Strict 모드 정적 타이핑 및 커스텀 UserSettings 타입 보장',
      techItem4: 'Vanilla CSS: HSL 색상 변수를 활용하여 부드러운 테마 전환 애니메이션 제공',
      cardCreditsTitle: '👥 크레딧 및 저작권',
      cardCreditsDesc: '본 프로젝트는 상태 관리 챌린지의 일환으로 개발되었습니다.',
      roleAdmin: '프로젝트 리드 / 아키텍트',
      roleDeveloper: '시니어 코어 개발자',
      cardGoalTitle: '🎯 구현 미션 목표',
      goalItem1: '설정 상태(Theme, Lang)의 타입 안정성 완벽 확보',
      goalItem2: '브라우저 새로고침 시 설정이 보존되는 Persistence 메커니즘 구축',
      goalItem3: '상단 바의 버튼을 누를 시 모든 페이지에서 테마 즉시 교체',
      goalItem4: '추가 과제인 theme, lang 및 dispatch 통합 custom hook 적용 완료'
    },
    en: {
      cardTechTitle: '💻 Technical Specifications',
      cardTechDesc: 'This application has been meticulously developed using state-of-the-art standards:',
      techItem1: 'Next.js App Router: Dynamic layouts, Server-Client boundary management',
      techItem2: 'Redux Toolkit + Persist: Standardized store slices and custom SSR storage safe-guards',
      techItem3: 'TypeScript: Strict typing and declarative type signatures for UserSettings',
      techItem4: 'Vanilla CSS: Custom HSL-driven palette configurations with CSS Transition layers',
      cardCreditsTitle: '👥 Contributors & Credits',
      cardCreditsDesc: 'Developed in compliance with advanced web state-management guidelines.',
      roleAdmin: 'Project Lead / Architect',
      roleDeveloper: 'Senior Core Engineer',
      cardGoalTitle: '🎯 Implementation Goals Achieved',
      goalItem1: 'Declared full static safety contracts for Theme and Lang values',
      goalItem2: 'Configured seamless browser-level persistence without hydration crashes',
      goalItem3: 'Supported synchronized real-time theme swapping from any navigation node',
      goalItem4: 'Created an advanced combined custom settings hook encapsulating operations'
    }
  };

  const t = translations[lang];

  return (
    <main className="main-content" style={{ padding: '0 1rem' }}>
      {/* About Page Hero */}
      <section className="about-hero" style={{ padding: '3rem 1rem', textDecoration: 'none' }}>
        <h1 className="about-hero-title" style={{ fontSize: '3rem', fontWeight: 800, margin: 0, marginBottom: '1rem' }}>
          {lang === 'ko' ? '소개 페이지' : 'About Page'}
        </h1>
        <p className="about-hero-subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, margin: 0 }}>
          페이지를 이동해도 테마와 언어가 유지되는지 확인하세요.
        </p>
      </section>

      {/* Grid: Tech Details & Credits */}
      <section className="about-content-box" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Technical details card */}
        <div className="card">
          <h2 className="card-title">{t.cardTechTitle}</h2>
          <p className="card-description">{t.cardTechDesc}</p>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>{t.techItem1}</li>
            <li>{t.techItem2}</li>
            <li>{t.techItem3}</li>
            <li>{t.techItem4}</li>
          </ul>
        </div>

        {/* Mission goals card */}
        <div className="card">
          <h2 className="card-title">{t.cardGoalTitle}</h2>
          <p className="card-description" style={{ marginBottom: '1rem' }}></p>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>{t.goalItem1}</li>
            <li>{t.goalItem2}</li>
            <li>{t.goalItem3}</li>
            <li>{t.goalItem4}</li>
          </ul>
        </div>
      </section>

      {/* Credits Card */}
      <section className="card">
        <h2 className="card-title">{t.cardCreditsTitle}</h2>
        <p className="card-description">{t.cardCreditsDesc}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          <div className="credit-card">
            <div className="credit-avatar">AG</div>
            <div className="credit-info">
              <span className="credit-name">Antigravity AI</span>
              <span className="credit-role">{t.roleAdmin}</span>
            </div>
          </div>

          <div className="credit-card">
            <div className="credit-avatar">U</div>
            <div className="credit-info">
              <span className="credit-name">User Developer</span>
              <span className="credit-role">{t.roleDeveloper}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
