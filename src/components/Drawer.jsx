import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Drawer({ isOpen, toggleDrawer }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toggleDrawer();
  };

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}
      <div className={`drawer ${isOpen ? 'open' : ''}`}>

        <div className="drawer-header">
          <span className="drawer-logo">OASIS</span>
          <button
            className="drawer-close"
            onClick={toggleDrawer}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
        </div>
        <nav>
          <ul>
            <li><NavLink to="/" onClick={toggleDrawer}>HOME</NavLink></li>
            <li><NavLink to="/story" onClick={toggleDrawer}>STORY</NavLink></li>
            <li><NavLink to="/members" onClick={toggleDrawer}>MEMBERS</NavLink></li>
            <li><NavLink to="/music" onClick={toggleDrawer}>MUSIC</NavLink></li>
            <li><NavLink to="/live" onClick={toggleDrawer}>LIVE</NavLink></li>

            <hr />
            <li className="shop-title">SHOP</li>

            <li><NavLink to="/edition" onClick={toggleDrawer}>EDITION</NavLink></li>
            <li><NavLink to="/customize" onClick={toggleDrawer}>CUSTOMIZE</NavLink></li>
            <li><NavLink to="/saved" onClick={toggleDrawer}>SAVED</NavLink></li>
            <li><NavLink to="/cart" onClick={toggleDrawer}>CART</NavLink></li>
            <hr />

            {user ? (
              <li>
                <button
                  type="button"
                  className="drawer-auth-btn"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </li>
            ) : (
              <li>
                <NavLink to="/login" onClick={toggleDrawer}>
                  LOGIN
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
