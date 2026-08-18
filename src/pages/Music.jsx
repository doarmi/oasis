import { useNavigate } from 'react-router-dom';

import definitelyMaybe from '../assets/definitely-maybe.jpg';
import morningGlory from '../assets/morning-glory.jpg';
import beHereNow from '../assets/be-here-now.jpg';

export default function Music() {
    const navigate = useNavigate();

    const handlePlay = (song) => {
        alert(`${song} 재생 기능을 준비 중입니다.`);
    };

    return (
        <div className="page-music">

            {/* MUSIC HERO */}
            <section className="music-hero">
                <div className="music-hero-content">
                    <span className="music-eyebrow">OASIS DISCOGRAPHY</span>
                    <h1>MUSIC</h1>
                    <h2>THE SOUND OF OASIS</h2>
                    <p>
                        시대를 넘어 계속 울려 퍼지는
                        <br />
                        오아시스의 음악을 만나보세요.
                    </p>
                </div>

                <img
                    src={morningGlory}
                    alt="What's the Story Morning Glory"
                    className="music-hero-cover"
                />
            </section>

            {/* ESSENTIAL ALBUMS */}
            <section className="music-albums">
                <div className="music-section-title">
                    <div>
                        <span>DISCOGRAPHY</span>
                        <h2>ESSENTIAL ALBUMS</h2>
                    </div>
                </div>

                <div className="music-album-list">
                    <article className="music-album-card">
                        <img src={definitelyMaybe} alt="Definitely Maybe" />
                        <span>1994</span>
                        <h3>Definitely Maybe</h3>
                        <p>Debut Album</p>
                    </article>

                    <article className="music-album-card">
                        <img src={morningGlory} alt="Morning Glory" />
                        <span>1995</span>
                        <h3>(What's the Story)<br />Morning Glory?</h3>
                        <p>Studio Album</p>
                    </article>

                    <article className="music-album-card">
                        <img src={beHereNow} alt="Be Here Now" />
                        <span>1997</span>
                        <h3>Be Here Now</h3>
                        <p>Studio Album</p>
                    </article>
                </div>
            </section>

            {/* NOW PLAYING */}
            <section className="music-now-playing">
                <span className="music-now-label">NOW PLAYING</span>

                <div className="music-player">
                    <img src={morningGlory} alt="Wonderwall" />

                    <div className="music-player-info">
                        <span>(WHAT'S THE STORY) MORNING GLORY?</span>
                        <h2>Wonderwall</h2>
                        <p>Oasis · 1995</p>
                    </div>

                    <button
                        type="button"
                        className="music-play-btn"
                        onClick={() => handlePlay('Wonderwall')}
                        aria-label="Wonderwall 재생"
                    >
                        ▶
                    </button>
                </div>
            </section>

            {/* ICONIC TRACKS */}
            <section className="music-tracks">
                <div className="music-section-title">
                    <div>
                        <span>THE SONGS</span>
                        <h2>ICONIC TRACKS</h2>
                    </div>
                </div>

                <div className="music-track-list">
                    {[
                        ['01', 'Wonderwall', 'Morning Glory · 1995'],
                        ['02', "Don't Look Back in Anger", 'Morning Glory · 1995'],
                        ['03', 'Live Forever', 'Definitely Maybe · 1994'],
                        ['04', 'Champagne Supernova', 'Morning Glory · 1995'],
                        ['05', 'Supersonic', 'Definitely Maybe · 1994'],
                    ].map(([number, title, album]) => (
                        <button
                            type="button"
                            className="music-track"
                            key={title}
                            onClick={() => handlePlay(title)}
                        >
                            <span className="music-track-number">{number}</span>

                            <span className="music-track-info">
                                <strong>{title}</strong>
                                <small>{album}</small>
                            </span>

                            <span className="music-track-play">▶</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* SHOP */}
            <section className="music-shop-banner">
                <span>COLLECT THE MUSIC</span>
                <h2>OASIS EDITION</h2>
                <p>오아시스의 앨범을 소장하세요.</p>

                <button
                    type="button"
                    onClick={() => navigate('/edition')}
                >
                    앨범 컬렉션 보기 <span>›</span>
                </button>
            </section>

        </div>
    );
}