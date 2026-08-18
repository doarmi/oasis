import { Link } from 'react-router-dom';
import heroImage from '../assets/oasis-hero.jpg';
import liveNewsImage from '../assets/knebworth-1996.jpg';
import musicNewsImage from '../assets/definitely-maybe.jpg';
import editionNewsImage from '../assets/be-here-now.jpg';
import playerCover from '../assets/morning-glory.jpg';
import vinylImage from '../assets/exclusive-vinyl.png';
export default function Home() {
    return (
        <div className="page-home">

            <section className="home-main-hero">
                <img
                    src={heroImage}
                    alt="Oasis band"
                    className="home-main-hero-img"
                />

                <div className="home-main-hero-overlay"></div>

                <div className="home-main-hero-content">
                    <h1>oasis</h1>

                    <p>
                        THE STORY CONTINUES.<br />
                        LEGEND. MUSIC. FOREVER.
                    </p>

                    <Link to="/story" className="home-story-btn">
                        스토리 보기 <span>›</span>
                    </Link>
                </div>
            </section>



            <section className="home-news">
                <div className="home-news-header">
                    <h2>새로운 소식</h2>

                    <Link to="/edition" className="home-news-more">
                        더보기 <span>›</span>
                    </Link>
                </div>

                <div className="home-news-list">

                    <article className="home-news-card">
                        <div className="home-news-image">
                            <img src={musicNewsImage} alt="Morning Glory Deluxe Edition" />
                            <span className="home-news-badge">NEW</span>
                        </div>

                        <div className="home-news-info">
                            <h3>(What’s the Story)<br />Morning Glory?</h3>
                            <p>DELUXE 에디션 예약 판매 시작</p>
                            <time>2026.05.12</time>
                        </div>
                    </article>

                    <article className="home-news-card">
                        <div className="home-news-image">
                            <img src={liveNewsImage} alt="Oasis Live Tour" />
                            <span className="home-news-badge">LIVE</span>
                        </div>

                        <div className="home-news-info">
                            <h3>2026 월드 투어<br />아시아 일정 공개</h3>
                            <p>오아시스 라이브 투어의 새로운 일정을 확인하세요</p>
                            <time>2026.05.10</time>
                        </div>
                    </article>

                    <article className="home-news-card">
                        <div className="home-news-image">
                            <img src={editionNewsImage} alt="Oasis Edition" />
                            <span className="home-news-badge">EDITION</span>
                        </div>

                        <div className="home-news-info">
                            <h3>TIME FLIES... 1994–2009<br />리마스터 앨범 발매</h3>
                            <p>새롭게 리마스터된 오아시스의 명곡을 만나보세요</p>
                            <time>2026.05.08</time>
                        </div>
                    </article>

                </div>
            </section>
            <section className="home-features">
                <div className="home-features-header">
                    <h2>주요 기능</h2>
                    <span></span>
                </div>

                <div className="home-features-list">
                    <Link to="/edition" className="home-feature-card">
                        <div className="home-feature-icon">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <line x1="8" y1="9" x2="16" y2="9" />
                                <line x1="8" y1="13" x2="16" y2="13" />
                                <line x1="8" y1="17" x2="13" y2="17" />
                            </svg>
                        </div>
                        <h3>에디션 비교</h3>
                        <div className="home-feature-line"></div>
                        <p>다양한 에디션을<br />비교해보세요</p>
                    </Link>

                    <Link to="/customize" className="home-feature-card">
                        <div className="home-feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <circle cx="9" cy="7" r="2" />
                                <line x1="4" y1="17" x2="20" y2="17" />
                                <circle cx="15" cy="17" r="2" />
                            </svg>
                        </div>
                        <h3>옵션 선택</h3>
                        <div className="home-feature-line"></div>
                        <p>나만의 앨범을<br />커스터마이징하세요</p>
                    </Link>

                    <Link to="/cart" className="home-feature-card">
                        <div className="home-feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="20" r="1" />
                                <circle cx="18" cy="20" r="1" />
                                <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6" />
                            </svg>
                        </div>
                        <h3>장바구니</h3>
                        <div className="home-feature-line"></div>
                        <p>선택한 구성을<br />확인하고 주문하세요</p>
                    </Link>

                    <Link to="/saved" className="home-feature-card">
                        <div className="home-feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 4h12v16l-6-4-6 4V4z" />
                            </svg>
                        </div>
                        <h3>저장 목록</h3>
                        <div className="home-feature-line"></div>
                        <p>관심 에디션을<br />저장하고 비교하세요</p>
                    </Link>
                </div>
            </section>
            <section className="home-vinyl-banner">
                <div className="home-vinyl-content">
                    <span className="home-vinyl-badge">LIMITED</span>

                    <h2>EXCLUSIVE VINYL</h2>

                    <p>
                        오아시스 공식 스토어 한정<br />
                        컬러 바이닐을 만나보세요.
                    </p>

                    <Link to="/edition" className="home-vinyl-btn">
                        자세히 보기 <span>›</span>
                    </Link>
                </div>

                <div className="home-vinyl-visual">
                    <img src={vinylImage} alt="Oasis Exclusive Vinyl" />
                </div>
            </section>
            <section className="home-player">
                <div className="home-player-info">
                    <div className="home-player-cover">
                        <img src={playerCover} alt="Morning Glory album cover" />
                    </div>

                    <div>
                        <span>NOW PLAYING</span>
                        <h3>Wonderwall</h3>
                        <p>Oasis</p>
                    </div>
                </div>

                <div className="home-player-controls">
                    <button type="button">‹</button>
                    <button type="button" className="home-player-play">▶</button>
                    <button type="button">›</button>
                </div>
            </section>
        </div>
    );
}