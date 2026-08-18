import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MyPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="page-mypage">
            <section className="mypage-container">

                <div className="mypage-header">
                    <span>MY ACCOUNT</span>
                    <h2>MY PAGE</h2>
                    <p>계정과 쇼핑 정보를 관리하세요.</p>
                </div>

                <section className="mypage-profile">
                    <div className="mypage-profile-icon">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 21a8 8 0 0 1 16 0" />
                        </svg>
                    </div>

                    <div className="mypage-profile-info">
                        <strong>{user?.name || 'Oasis User'}</strong>
                        <p>{user?.email || 'demo@oasis.com'}</p>
                        <span>{user?.provider || 'Google'} 로그인</span>
                    </div>
                </section>

                <div className="mypage-menu">

                    <button
                        type="button"
                        className="mypage-menu-item"
                        onClick={() => alert('주문 내역 기능을 준비 중입니다.')}
                    >
                        <span>주문 / 구매 내역</span>
                        <span>›</span>
                    </button>

                    <Link to="/saved" className="mypage-menu-item">
                        <span>저장 목록</span>
                        <span>›</span>
                    </Link>

                    <Link to="/cart" className="mypage-menu-item">
                        <span>장바구니</span>
                        <span>›</span>
                    </Link>

                    <button
                        type="button"
                        className="mypage-menu-item"
                        onClick={() => alert('배송지 관리 기능을 준비 중입니다.')}
                    >
                        <span>배송지 관리</span>
                        <span>›</span>
                    </button>

                </div>

                <button
                    type="button"
                    className="mypage-logout-btn"
                    onClick={handleLogout}
                >
                    LOGOUT
                </button>

            </section>
        </div>
    );
}