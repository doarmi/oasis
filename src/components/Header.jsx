import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ toggleDrawer }) {
  const { cart } = useShop();
  const { user, logout } = useAuth();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);

  const cartCount = cart.length;

  useEffect(() => {
    if (cartCount === 0) return;

    setCartPulse(false);

    const timer = setTimeout(() => {
      setCartPulse(true);
    }, 10);

    const resetTimer = setTimeout(() => {
      setCartPulse(false);
    }, 350);

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
    };
  }, [cartCount]);

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
  };

  return (
    <header className="common-header">
      <button
        type="button"
        onClick={toggleDrawer}
        className="hamburger-btn"
        aria-label="메뉴 열기"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <h1 className="header-logo">
        <Link to="/" aria-label="홈으로 이동">
          OASIS
        </Link>
      </h1>

      <div className="header-actions">
        {user ? (
          <div className="header-account">
            <button
              type="button"
              className="header-user-btn logged-in"
              onClick={() => setIsAccountOpen((prev) => !prev)}
              aria-label="계정 메뉴"
              aria-expanded={isAccountOpen}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
              </svg>

              <span className="header-user-status"></span>
            </button>

            {isAccountOpen && (
              <div className="header-account-menu">
                <div className="header-account-status">
                  <span className="account-status-dot"></span>
                  SIGNED IN
                </div>

                <Link
                  to="/mypage"
                  className="header-account-item"
                  onClick={() => setIsAccountOpen(false)}
                >
                  MY PAGE
                </Link>

                <button
                  type="button"
                  className="header-account-item logout"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="header-user-btn"
            aria-label="로그인"
            title="로그인"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </Link>
        )}

        <Link
          to="/cart"
          className="header-cart"
          aria-label="장바구니로 이동"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="20" r="1" />
            <circle cx="19" cy="20" r="1" />
            <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6" />
          </svg>

          {cartCount > 0 && (
            <span
              className={`header-cart-badge ${cartPulse ? 'pulse' : ''}`}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}