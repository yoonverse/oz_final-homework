'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme, setLanguage } from '@/store/settingsSlice';
import Link from 'next/link';

export default function Navbar() {
  const dispatch = useDispatch();

  // 💡 [과제 5] 리덕스 스토어에서 theme과 lang을 가져오세요.
  const { theme, lang } = useSelector((state: RootState) => state.settings);

  return (
    <nav className="navbar" style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--navbar-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button className="btn btn-navbar-theme" onClick={() => dispatch(toggleTheme())}>모드: {theme}</button>
      <button className={`btn btn-navbar-lang ${lang === 'ko' ? 'active' : ''}`} onClick={() => dispatch(setLanguage('ko'))}>KO</button>
      <button className={`btn btn-navbar-lang ${lang === 'en' ? 'active' : ''}`} onClick={() => dispatch(setLanguage('en'))}>EN</button>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
        <Link href="/" className="navbar-link-simple">홈</Link>
        <Link href="/about" className="navbar-link-simple">소개</Link>
      </div>
    </nav>
  );
}
