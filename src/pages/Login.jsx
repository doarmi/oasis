import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleGoogleLogin = () => {
        if (isLoading) return;

        setIsLoading(true);

        setTimeout(() => {
            login('google');
            navigate('/');
        }, 1500);
    };

    return (
        <div className="page-login">
            {isLoading && (
                <div className="login-loading">
                    <div className="login-vinyl">
                        <div className="login-vinyl-ring"></div>

                        <div className="login-vinyl-label">
                            <strong>OASIS</strong>
                            <span>LIVE FOREVER</span>
                        </div>

                        <div className="login-vinyl-hole"></div>
                    </div>

                    <p>SIGNING IN...</p>
                </div>
            )}

            <section className="login-container">
                <div className="login-heading">
                    <span className="login-eyebrow">WELCOME BACK</span>
                    <h2>LOGIN</h2>
                    <p>
                        OASIS의 음악과 이야기를
                        <br />
                        계속 만나보세요.
                    </p>
                </div>

                <div className="login-divider">
                    <span></span>
                    <strong>CONTINUE WITH</strong>
                    <span></span>
                </div>

                <div className="login-social-list">
                    <button
                        type="button"
                        className="login-social-btn login-google"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        <span className="login-social-icon login-google-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    fill="#4285F4"
                                    d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 22c2.7 0 4.97-.9 6.63-2.36l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M6.39 13.93A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.45H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.55l3.35-2.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.94c1.47 0 2.79.51 3.83 1.5l2.87-2.88C16.96 2.94 14.7 2 12 2a10 10 0 0 0-8.96 5.45l3.35 2.62C7.18 7.7 9.39 5.94 12 5.94z"
                                />
                            </svg>
                        </span>

                        <span>Google로 계속하기</span>
                    </button>

                    <button
                        type="button"
                        className="login-social-btn login-kakao"
                    >
                        <span className="login-social-icon">
                            <svg
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#191919"
                                    d="M12 3C6.48 3 2 6.48 2 10.77c0 2.75 1.84 5.17 4.61 6.55l-1.17 4.29c-.1.38.33.68.65.46l5.13-3.39c.26.02.52.03.78.03 5.52 0 10-3.48 10-7.94S17.52 3 12 3z"
                                />
                            </svg>
                        </span>

                        <span>카카오로 계속하기</span>
                    </button>

                    <button
                        type="button"
                        className="login-social-btn login-apple"
                    >
                        <span className="login-social-icon login-apple-icon">
                            ●
                        </span>

                        <span>Apple로 계속하기</span>
                    </button>
                </div>

                <p className="login-note">
                    로그인하여 저장 목록과 장바구니를 관리하세요.
                </p>
            </section>
        </div>
    );
}