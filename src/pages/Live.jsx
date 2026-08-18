import liveHero from '../assets/live-hero.png';
import knebworth1996 from '../assets/knebworth-1996.jpg';
import maineRoad1996 from '../assets/maine-road-1996.jpg';

export default function Live() {
  return (
    <div className="page-live">

      {/* LIVE HERO */}
      <section className="live-main-hero">
        <img
          src={liveHero}
          alt="Oasis Live"
          className="live-main-hero-img"
        />

        <div className="live-main-hero-overlay"></div>

        <div className="live-main-hero-content">
          <span className="live-main-label">LIVE</span>

          <h1>Tour & Live</h1>

          <p>
            오아시스의 라이브와 투어 일정을
            <br />
            확인하고 티켓을 예매하세요.
          </p>

          <button
            type="button"
            className="live-main-btn"
            onClick={() => {
              document
                .getElementById('live-tour')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            투어 일정 보기 <span>›</span>
          </button>
        </div>
      </section>


      {/* TOUR SECTION */}
      <section id="live-tour" className="live-tour-section">

        <div className="live-tour-poster">
          <div className="live-tour-poster-inner">
            <span>LIVE '25</span>

            <h2>
              OASIS LIVE '25
              <br />
              <strong>25 LIVE</strong>
            </h2>

            <img
              src={knebworth1996}
              alt="Oasis Live 25"
            />

            <p>live forever</p>

            <small>
              CARDIFF · MANCHESTER · LONDON
              <br />
              EDINBURGH · DUBLIN · ASIA
            </small>
          </div>
        </div>


        <div className="live-tour-schedule">

          <div className="live-tour-header">
            <div>
              <h2>OASIS LIVE '25</h2>
              <p>2025 WORLD TOUR</p>
            </div>

            <button
              type="button"
              className="live-all-btn"
              onClick={() => {
                document
                  .getElementById('live-tour-list')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              전체 일정 보기 <span>›</span>
            </button>
          </div>


          <div id="live-tour-list" className="live-tour-list">

            <article className="live-tour-row">
              <div className="live-tour-date">
                <strong>07.04</strong>
                <span>FRI</span>
              </div>

              <div className="live-tour-place">
                <h3>카디프, 웨일스</h3>
                <p>Principality Stadium</p>
              </div>

              <div className="live-tour-action">
                <span className="live-sold-out">SOLD OUT</span>
                <small>매진</small>
              </div>
            </article>


            <article className="live-tour-row">
              <div className="live-tour-date">
                <strong>07.11</strong>
                <span>FRI</span>
              </div>

              <div className="live-tour-place">
                <h3>맨체스터, 영국</h3>
                <p>Heaton Park</p>
              </div>

              <div className="live-tour-action">
                <span className="live-sold-out">SOLD OUT</span>
                <small>매진</small>
              </div>
            </article>


            <article className="live-tour-row">
              <div className="live-tour-date">
                <strong>07.25</strong>
                <span>FRI</span>
              </div>

              <div className="live-tour-place">
                <h3>런던, 영국</h3>
                <p>Wembley Stadium</p>
              </div>

              <div className="live-tour-action">
                <button
                  type="button"
                  className="live-book-btn"
                  onClick={() => alert('예매 페이지를 준비 중입니다.')}
                >
                  예매하기 <span>›</span>
                </button>
                <small>남은 티켓 있음</small>
              </div>
            </article>


            <article className="live-tour-row">
              <div className="live-tour-date">
                <strong>08.02</strong>
                <span>SAT</span>
              </div>

              <div className="live-tour-place">
                <h3>에든버러, 스코틀랜드</h3>
                <p>Murrayfield Stadium</p>
              </div>

              <div className="live-tour-action">
                <button
                  type="button"
                  className="live-book-btn"
                  onClick={() => alert('예매 페이지를 준비 중입니다.')}
                >
                  예매하기 <span>›</span>
                </button>
                <small>남은 티켓 있음</small>
              </div>
            </article>


            <article className="live-tour-row">
              <div className="live-tour-date">
                <strong>08.16</strong>
                <span>SAT</span>
              </div>

              <div className="live-tour-place">
                <h3>더블린, 아일랜드</h3>
                <p>Croke Park</p>
              </div>

              <div className="live-tour-action">
                <button
                  type="button"
                  className="live-book-btn"
                  onClick={() => alert('예매 페이지를 준비 중입니다.')}
                >
                  예매하기 <span>›</span>
                </button>
                <small>남은 티켓 있음</small>
              </div>
            </article>

          </div>

          <p className="live-tour-notice">
            ⓘ 추가 일정은 추후 공개됩니다.
          </p>

        </div>
      </section>


      {/* LIVE NEWS */}
      <section className="live-news">

        <div className="live-news-header">
          <h2>LIVE NEWS</h2>

          <button
            type="button"
            className="live-news-more"
            onClick={() => alert('더 많은 라이브 뉴스를 준비 중입니다.')}
          >
            더보기 <span>›</span>
          </button>
        </div>


        <div className="live-news-list">

          <article
            className="live-news-card"
            onClick={() => alert('2025 월드 투어 추가 일정 소식을 준비 중입니다.')}
          >
            <div className="live-news-image">
              <img
                src={liveHero}
                alt="2025 월드 투어 추가 일정"
              />
              <span>ANNOUNCEMENT</span>
            </div>

            <h3>2025 월드 투어 추가 일정 발표!</h3>
            <time>2025.05.15</time>
          </article>

          <article
            className="live-news-card"
            onClick={() => alert('런던 웸블리 공연 하이라이트 영상을 준비 중입니다.')}
          >
            <div className="live-news-image">
              <img
                src={maineRoad1996}
                alt="런던 웸블리 공연"
              />
              <span>MEDIA</span>
            </div>

            <h3>런던 웸블리 공연 하이라이트 영상 공개</h3>
            <time>2025.05.08</time>
          </article>

          <article
            className="live-news-card"
            onClick={() => alert('리암 갤러거 투어 인터뷰를 준비 중입니다.')}
          >
            <div className="live-news-image">
              <img
                src={knebworth1996}
                alt="Oasis Tour Interview"
              />
              <span>INTERVIEW</span>
            </div>

            <h3>리암 갤러거, 투어에 대한 인터뷰 공개</h3>
            <time>2025.04.30</time>
          </article>




        </div>
      </section>

    </div>
  );
}