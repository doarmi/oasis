import { Link } from 'react-router-dom';

export default function Header({ toggleDrawer }) {
  return (
    <header className="common-header">
      <button
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

      <Link to="/cart" className="header-cart" aria-label="장바구니로 이동">
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
      </Link>
    </header>
  );
}