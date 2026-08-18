import { NavLink, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const isShopActive = location.pathname.match(/edition|customize|cart|saved/);

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({isActive}) => isActive && location.pathname === '/' ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">⌂</span>
        <span className="nav-label">홈</span>
      </NavLink>
      <NavLink to="/story" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">📖</span>
        <span className="nav-label">스토리</span>
      </NavLink>
      <NavLink to="/members" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">👤</span>
        <span className="nav-label">멤버</span>
      </NavLink>
      <NavLink to="/music" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">🎵</span>
        <span className="nav-label">뮤직</span>
      </NavLink>
      <NavLink to="/live" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">🎤</span>
        <span className="nav-label">라이브</span>
      </NavLink>
      <NavLink to="/edition" className={isShopActive ? "nav-item active" : "nav-item"}>
        <span className="nav-icon">🛒</span>
        <span className="nav-label">샵</span>
      </NavLink>
    </nav>
  );
}
