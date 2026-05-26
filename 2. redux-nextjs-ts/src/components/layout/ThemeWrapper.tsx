'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useSelector((state: RootState) => state.settings);
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 오류 방지: 서버 HTML과 클라이언트 첫 렌더링이 다르면 에러가 발생합니다.
  // useEffect는 브라우저에 화면이 나타난(Mount) 뒤에만 실행되므로, 이때 상태를 동기화합니다.
  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트 전에는 레이아웃 깨짐을 방지하기 위해 빈 화면(또는 투명 화면)을 보여줍니다.
  if (!mounted) {
    return <div style={{ minHeight: '100vh' }}>{children}</div>;
  }

  return (
    <div
      className={`app-container ${theme === 'dark' ? 'dark' : ''}`}
      style={{
        // 💡 [과제 4] theme에 따라 배경색과 글자색이 바뀌도록 삼항 연산자를 사용하세요.
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        minHeight: '100vh',
        transition: 'all 0.3s'
      }}
    >
      <Navbar />
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
