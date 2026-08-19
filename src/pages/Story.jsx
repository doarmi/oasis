import { useState } from 'react';

import storyHeroImage from '../assets/oasis-hero.jpg';
import manchesterImage from '../assets/oasis-hero.jpg';
import knebworthImage from '../assets/knebworth-1996.jpg';
import albumStoryImage from '../assets/morning-glory.jpg';

export default function Story() {
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const storySlides = [
    storyHeroImage,
    knebworthImage,
    albumStoryImage,
  ];

  return (
    <div className="page-story">

      {/* STORY INTRO */}
      <section className="story-intro">
        <div>
          <h2>STORY</h2>
          <p>오아시스의 역사와 순간들</p>
        </div>

        <div className="story-tape">
          Live Forever
        </div>
      </section>


      {/* STORY HERO */}
      <section className="story-hero">
        <img
          src={storySlides[currentSlide]}
          alt="Oasis story"
          className="story-hero-img"
        />

        <div className="story-hero-overlay"></div>

        <div className="story-hero-content">
          <h1>
            THE STORY
            <br />
            CONTINUES.
          </h1>

          <p>
            1991년 맨체스터에서 시작된
            <br />
            오아시스의 전설적인 여정.
          </p>

          <button
            type="button"
            className="story-history-btn"
            onClick={() =>
              document
                .getElementById('story-timeline')
                ?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
            }
          >
            연혁 보기 <span>›</span>
          </button>
        </div>

        <button
          type="button"
          className="story-arrow story-arrow-left"
          aria-label="이전 이미지"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0
                ? storySlides.length - 1
                : prev - 1
            )
          }
        >
          ‹
        </button>

        <button
          type="button"
          className="story-arrow story-arrow-right"
          aria-label="다음 이미지"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === storySlides.length - 1
                ? 0
                : prev + 1
            )
          }
        >
          ›
        </button>

        <div className="story-dots">
          {storySlides.map((_, index) => (
            <span
              key={index}
              className={
                currentSlide === index
                  ? 'active'
                  : ''
              }
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>


      {/* TIMELINE */}
      <section
        id="story-timeline"
        className="story-timeline reveal"
      >
        <div className="story-timeline-header">
          <h2>연대기</h2>

          <button
            type="button"
            className="story-timeline-more"
            onClick={() =>
              setShowFullTimeline((prev) => !prev)
            }
          >
            {showFullTimeline ? '접기' : '전체 보기'}{' '}
            <span>›</span>
          </button>
        </div>

        <div className="story-timeline-list">

          <div className="story-timeline-item">
            <span className="story-timeline-dot"></span>
            <strong>1991–1993</strong>
            <p>결성 & 초기</p>
          </div>

          <div className="story-timeline-item active">
            <span className="story-timeline-dot"></span>
            <strong>1994–1995</strong>
            <p>Definitely Maybe</p>
          </div>

          <div className="story-timeline-item">
            <span className="story-timeline-dot"></span>
            <strong>1996–1997</strong>
            <p>Knebworth</p>
          </div>

          <div className="story-timeline-item">
            <span className="story-timeline-dot"></span>
            <strong>1998–2002</strong>
            <p>새로운 시대</p>
          </div>

          <div className="story-timeline-item">
            <span className="story-timeline-dot"></span>
            <strong>2003–2009</strong>
            <p>마지막 챕터</p>
          </div>

          <div className="story-timeline-item">
            <span className="story-timeline-dot"></span>
            <strong>2010–현재</strong>
            <p>그리고 지금</p>
          </div>

        </div>

        {showFullTimeline && (
          <div className="story-timeline-detail">

            <div className="story-timeline-detail-item">
              <strong>2009</strong>
              <p>밴드 활동 중단</p>
            </div>

            <div className="story-timeline-detail-item">
              <strong>2024</strong>
              <p>Oasis 재결합 발표</p>
            </div>

            <div className="story-timeline-detail-item">
              <strong>2025</strong>
              <p>Oasis Live '25 월드 투어</p>
            </div>

          </div>
        )}
      </section>


      {/* HIGHLIGHTS */}
      <section className="story-highlights reveal">
        <div className="story-highlights-header">
          <h2>주요 이야기</h2>
        </div>

        <div className="story-highlights-list">

          <article className="story-highlight-card">
            <div className="story-highlight-image">
              <img
                src={manchesterImage}
                alt="Oasis Manchester"
              />
            </div>

            <div className="story-highlight-content">
              <span>ORIGIN</span>
              <h3>맨체스터의 시작</h3>
              <p>
                1991년, 오아시스의 이야기가 시작된 순간.
              </p>
            </div>
          </article>


          <article className="story-highlight-card">
            <div className="story-highlight-image">
              <img
                src={knebworthImage}
                alt="Oasis Knebworth 1996"
              />
            </div>

            <div className="story-highlight-content">
              <span>LIVE</span>
              <h3>Knebworth 1996</h3>
              <p>
                브릿팝의 정점을 증명한 전설적인 무대.
              </p>
            </div>
          </article>


          <article className="story-highlight-card">
            <div className="story-highlight-image">
              <img
                src={albumStoryImage}
                alt="Morning Glory album"
              />
            </div>

            <div className="story-highlight-content">
              <span>ALBUM</span>
              <h3>전설의 앨범</h3>
              <p>
                시대를 바꾼 오아시스의 대표작들.
              </p>
            </div>
          </article>

        </div>
      </section>


      {/* SCRAPBOOK */}
      <section className="story-scrapbook reveal">

        <div className="story-quote">
          <p>
            We see things
            <br />
            they'll never see.
          </p>

          <span>– Oasis</span>
        </div>

        <div className="story-scrapbook-photo">
          <img
            src={knebworthImage}
            alt="Oasis live crowd"
          />
        </div>

      </section>

    </div>
  );
}