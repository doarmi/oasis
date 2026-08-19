import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import heroImage from '../assets/oasis-hero.jpg';
import liveNewsImage from '../assets/knebworth-1996.jpg';
import musicNewsImage from '../assets/definitely-maybe.jpg';
import editionNewsImage from '../assets/be-here-now.jpg';
import playerCover from '../assets/morning-glory.jpg';
import vinylImage from '../assets/exclusive-vinyl.png';

export default function Home() {
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    /* =========================================================
       PLAYER
       ========================================================= */

    const togglePlay = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        try {
            if (audio.paused) {
                await audio.play();
                setIsPlaying(true);
            } else {
                audio.pause();
                setIsPlaying(false);
            }
        } catch (error) {
            console.log('Audio playback failed:', error);
        }
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;

        if (!audio || !audio.duration) return;

        setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;

        if (!audio) return;

        setDuration(audio.duration);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    const handleProgressClick = (event) => {
        const audio = audioRef.current;

        if (!audio || !audio.duration) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const ratio = clickX / rect.width;

        audio.currentTime = ratio * audio.duration;
        setProgress(ratio * 100);
    };

    const skipBackward = () => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.currentTime = Math.max(0, audio.currentTime - 10);
    };

    const skipForward = () => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.currentTime = Math.min(
            audio.duration || 0,
            audio.currentTime + 10
        );
    };

    /* 페이지에서 Home이 사라지면 재생 중지 */
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    return (
        <div className="page-home">
            {/* 실제 오디오 */}
            <audio
                ref={audioRef}
                src="/audio/wonderwall-preview.mp3"
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            {/* =====================================================
          HERO
          ===================================================== */}
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
                        THE STORY CONTINUES.
                        <br />
                        LEGEND. MUSIC. FOREVER.
                    </p>

                    <Link to="/story" className="home-story-btn">
                        스토리 보기 <span>›</span>
                    </Link>
                </div>
            </section>

            {/* =====================================================
          NEWS
          ===================================================== */}
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
                            <img
                                src={musicNewsImage}
                                alt="Morning Glory Deluxe Edition"
                            />

                            <span className="home-news-badge">
                                NEW
                            </span>
                        </div>

                        <div className="home-news-info">
                            <h3>
                                (What’s the Story)
                                <br />
                                Morning Glory?
                            </h3>

                            <p>
                                DELUXE 에디션 예약 판매 시작
                            </p>

                            <time>2026.05.12</time>
                        </div>
                    </article>

                    <article className="home-news-card">
                        <div className="home-news-image">
                            <img
                                src={liveNewsImage}
                                alt="Oasis Live Tour"
                            />

                            <span className="home-news-badge">
                                LIVE
                            </span>
                        </div>

                        <div className="home-news-info">
                            <h3>
                                2026 월드 투어
                                <br />
                                아시아 일정 공개
                            </h3>

                            <p>
                                오아시스 라이브 투어의 새로운 일정을 확인하세요
                            </p>

                            <time>2026.05.10</time>
                        </div>
                    </article>

                    <article className="home-news-card">
                        <div className="home-news-image">
                            <img
                                src={editionNewsImage}
                                alt="Oasis Edition"
                            />

                            <span className="home-news-badge">
                                EDITION
                            </span>
                        </div>

                        <div className="home-news-info">
                            <h3>
                                TIME FLIES... 1994–2009
                                <br />
                                리마스터 앨범 발매
                            </h3>

                            <p>
                                새롭게 리마스터된 오아시스의 명곡을 만나보세요
                            </p>

                            <time>2026.05.08</time>
                        </div>
                    </article>
                </div>
            </section>

            {/* =====================================================
          FEATURES
          ===================================================== */}
            <section className="home-features">
                <div className="home-features-header">
                    <h2>주요 기능</h2>
                    <span></span>
                </div>

                <div className="home-features-list">
                    <Link
                        to="/edition"
                        className="home-feature-card"
                    >
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
                                <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="2"
                                />
                                <line x1="8" y1="9" x2="16" y2="9" />
                                <line x1="8" y1="13" x2="16" y2="13" />
                                <line x1="8" y1="17" x2="13" y2="17" />
                            </svg>
                        </div>

                        <h3>에디션 비교</h3>

                        <div className="home-feature-line"></div>

                        <p>
                            다양한 에디션을
                            <br />
                            비교해보세요
                        </p>
                    </Link>

                    <Link
                        to="/customize"
                        className="home-feature-card"
                    >
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
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <circle cx="9" cy="7" r="2" />
                                <line x1="4" y1="17" x2="20" y2="17" />
                                <circle cx="15" cy="17" r="2" />
                            </svg>
                        </div>

                        <h3>옵션 선택</h3>

                        <div className="home-feature-line"></div>

                        <p>
                            나만의 앨범을
                            <br />
                            커스터마이징하세요
                        </p>
                    </Link>

                    <Link
                        to="/cart"
                        className="home-feature-card"
                    >
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
                                <circle cx="9" cy="20" r="1" />
                                <circle cx="18" cy="20" r="1" />

                                <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6" />
                            </svg>
                        </div>

                        <h3>장바구니</h3>

                        <div className="home-feature-line"></div>

                        <p>
                            선택한 구성을
                            <br />
                            확인하고 주문하세요
                        </p>
                    </Link>

                    <Link
                        to="/saved"
                        className="home-feature-card"
                    >
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
                                <path d="M6 4h12v16l-6-4-6 4V4z" />
                            </svg>
                        </div>

                        <h3>저장 목록</h3>

                        <div className="home-feature-line"></div>

                        <p>
                            관심 에디션을
                            <br />
                            저장하고 비교하세요
                        </p>
                    </Link>
                </div>
            </section>

            {/* =====================================================
          VINYL BANNER
          ===================================================== */}
            <section className="home-vinyl-banner">
                <div className="home-vinyl-content">
                    <span className="home-vinyl-badge">
                        LIMITED
                    </span>

                    <h2>EXCLUSIVE VINYL</h2>

                    <p>
                        오아시스 공식 스토어 한정
                        <br />
                        컬러 바이닐을 만나보세요.
                    </p>

                    <Link
                        to="/edition"
                        className="home-vinyl-btn"
                    >
                        자세히 보기 <span>›</span>
                    </Link>
                </div>

                <div className="home-vinyl-visual">
                    <img
                        src={vinylImage}
                        alt="Oasis Exclusive Vinyl"
                    />
                </div>
            </section>

            {/* =====================================================
          REAL MINI PLAYER
          ===================================================== */}
            <section className="home-player">
                <div className="home-player-info">
                    <div
                        className={`home-player-cover ${isPlaying ? 'playing' : ''
                            }`}
                    >
                        <img
                            src={playerCover}
                            alt="Morning Glory album cover"
                        />
                    </div>

                    <div className="home-player-text">
                        <span>NOW PLAYING</span>
                        <h3>Wonderwall</h3>
                        <p>Oasis</p>

                        <div className="music-platform-links">
                            <a
                                href="https://www.youtube.com/watch?v=bx1Bh8ZvH84"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="music-platform-link youtube"
                                aria-label="YouTube에서 Wonderwall 듣기"
                            >
                                YouTube
                            </a>

                            <a
                                href="https://music.apple.com/kr/album/wonderwall/1812930495?i=1812930499"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="music-platform-link apple-music"
                                aria-label="Apple Music에서 Wonderwall 듣기"
                            >
                                Apple Music
                            </a>

                            <a
                                href="https://open.spotify.com/track/79RUMZfMNMpqZnswovvTqv"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="music-platform-link spotify"
                                aria-label="Spotify에서 Wonderwall 듣기"
                            >
                                Spotify
                            </a>
                        </div>
                    </div>
                </div>

                <div className="home-player-main">
                    <div className="home-player-controls">
                        <button
                            type="button"
                            onClick={skipBackward}
                            aria-label="10초 뒤로"
                            title="10초 뒤로"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            className="home-player-play"
                            onClick={togglePlay}
                            aria-label={
                                isPlaying
                                    ? '일시정지'
                                    : '재생'
                            }
                        >
                            {isPlaying ? '❚❚' : '▶'}
                        </button>

                        <button
                            type="button"
                            onClick={skipForward}
                            aria-label="10초 앞으로"
                            title="10초 앞으로"
                        >
                            ›
                        </button>
                    </div>

                    <div
                        className="home-player-progress"
                        onClick={handleProgressClick}
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={progress}
                    >
                        <div
                            className="home-player-progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>
                </div>
            </section>
        </div>
    );
}