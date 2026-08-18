import { useState } from 'react';
import { Link } from 'react-router-dom';
import noelGallagher from '../assets/noel-gallagher.jpg';
import liamGallagher from '../assets/liam-gallagher.jpg';
import gemArcher from '../assets/gem-archer.jpg';
import andyBell from '../assets/andy-bell.jpg';
import joeyWaronker from '../assets/joey-waronker.jpg';



export default function Members() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAllProfiles, setShowAllProfiles] = useState(false);
  const [currentMemberSlide, setCurrentMemberSlide] = useState(0);

  const memberSlides = [
    liamGallagher,
    noelGallagher,
    gemArcher,
    andyBell,
    joeyWaronker,
  ];
  return (
    <div className="page-members">
      <section className="members-intro">
        <div>
          <h2>MEMBERS</h2>
          <span className="members-script">the band</span>
          <p>오아시스의 멤버들을 소개합니다.</p>
        </div>

        <div className="members-tape">
          Live Forever
        </div>
      </section>
      <section className="members-hero">
        <img
          src={memberSlides[currentMemberSlide]}
          alt="Oasis band"
          className="members-hero-img"
        />

        <div className="members-hero-overlay"></div>

        <div className="members-hero-content">
          <h1>
            THE
            <br />
            BAND.
          </h1>

          <p>
            함께 만들어온 사운드,
            <br />
            함께 걸어온 시간.
          </p>

          <Link to="/story" className="members-band-btn">
            밴드 소개 보기 <span>›</span>
          </Link>
        </div>

        <button
          type="button"
          className="members-arrow members-arrow-left"
          onClick={() =>
            setCurrentMemberSlide((prev) =>
              prev === 0 ? memberSlides.length - 1 : prev - 1
            )
          }
        >
          ‹
        </button>

        <button
          type="button"
          className="members-arrow members-arrow-right"
          onClick={() =>
            setCurrentMemberSlide((prev) =>
              prev === memberSlides.length - 1 ? 0 : prev + 1
            )
          }
        >
          ›
        </button>

        <div className="members-dots">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <section className="members-current" id="current-members">
        <div className="members-current-header">
          <h2>현재 멤버</h2>
          <button
            type="button"
            className="members-profile-more"
            onClick={() => setShowAllProfiles(true)}
          >
            전체 프로필 보기 <span>›</span>
          </button>
        </div>

        <div className="members-current-list">
          <article
            className="members-current-card"
            onClick={() =>
              setSelectedMember({
                name: 'Liam Gallagher',
                role: 'Vocals',
                image: liamGallagher,
                description: '오아시스의 상징적인 보컬이자 독보적인 프론트맨.'
              })
            }
          >
            <img src={liamGallagher} alt="Liam Gallagher" />
            <h3>Liam Gallagher</h3>
            <strong>Vocals</strong>
            <p>오아시스의 상징적인 보컬.</p>
            <span className="members-instagram">◎</span>
          </article>

          <article
            className="members-current-card"
            onClick={() =>
              setSelectedMember({
                name: 'Noel Gallagher',
                role: 'Guitar / Vocals',
                image: noelGallagher,
                description: '오아시스의 핵심 작곡가이자 기타리스트. 수많은 대표곡을 만들며 밴드의 사운드를 이끌었습니다.'
              })
            }
          >
            <img src={noelGallagher} alt="Noel Gallagher" />
            <h3>Noel Gallagher</h3>
            <strong>Guitar / Vocals</strong>
            <p>작곡과 기타를 맡아 밴드를 이끕니다.</p>
            <span className="members-instagram">◎</span>
          </article>

          <article
            className="members-current-card"
            onClick={() =>
              setSelectedMember({
                name: 'Gem Archer',
                role: 'Guitar',
                image: gemArcher,
                description: '섬세하고 안정적인 기타 사운드로 오아시스의 무대를 채우는 기타리스트.'
              })
            }
          >
            <img src={gemArcher} alt="Gem Archer" />
            <h3>Gem Archer</h3>
            <strong>Guitar</strong>
            <p>섬세한 기타 사운드로 밴드를 완성합니다.</p>
            <span className="members-instagram">◎</span>
          </article>

          <article
            className="members-current-card"
            onClick={() =>
              setSelectedMember({
                name: 'Andy Bell',
                role: 'Bass',
                image: andyBell,
                description: '견고한 베이스 연주로 밴드 사운드의 중심을 잡는 베이시스트.'
              })
            }
          >
            <img src={andyBell} alt="Andy Bell" />
            <h3>Andy Bell</h3>
            <strong>Bass</strong>
            <p>견고한 베이스로 사운드의 중심을 잡습니다.</p>
            <span className="members-instagram">◎</span>
          </article>

          <article
            className="members-current-card"
            onClick={() =>
              setSelectedMember({
                name: 'Joey Waronker',
                role: 'Drums',
                image: joeyWaronker,
                description: '파워풀하고 정교한 드러밍으로 오아시스의 라이브 사운드를 이끄는 드러머.'
              })
            }
          >
            <img src={joeyWaronker} alt="Joey Waronker" />
            <h3>Joey Waronker</h3>
            <strong>Drums</strong>
            <p>파워풀한 드러밍으로 밴드를 움직입니다.</p>
            <span className="members-instagram">◎</span>
          </article>
        </div>
      </section>


      <section className="members-history" id="band-history">
        <div className="members-history-intro">
          <span>BAND HISTORY</span>
          <h2>오아시스 연혁</h2>
          <p>
            1991년부터 지금까지<br />
            오아시스의 발자취를 확인해보세요.
          </p>

          <Link to="/story" className="members-history-link">
            연혁 보기 <span>›</span>
          </Link>
        </div>

        <div className="members-history-timeline">
          <div className="members-history-item">
            <span></span>
            <strong>1991</strong>
            <p>결성</p>
          </div>

          <div className="members-history-item">
            <span></span>
            <strong>1994</strong>
            <p>데뷔<br />(Definitely Maybe)</p>
          </div>

          <div className="members-history-item">
            <span></span>
            <strong>1995</strong>
            <p>(What's the Story)<br />Morning Glory?</p>
          </div>

          <div className="members-history-item">
            <span></span>
            <strong>2000</strong>
            <p>변화</p>
          </div>

          <div className="members-history-item">
            <span></span>
            <strong>2009</strong>
            <p>해체</p>
          </div>

          <div className="members-history-item">
            <span></span>
            <strong>현재</strong>
            <p>진행 중</p>
          </div>
        </div>
      </section>
      {selectedMember && (
        <div className="member-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="member-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="member-modal-close"
              onClick={() => setSelectedMember(null)}
            >
              ×
            </button>

            <img src={selectedMember.image} alt={selectedMember.name} />

            <div className="member-modal-content">
              <h2>{selectedMember.name}</h2>
              <strong>{selectedMember.role}</strong>
              <p>{selectedMember.description}</p>
            </div>
          </div>
        </div>

      )}
      {showAllProfiles && (
        <div
          className="all-profiles-overlay"
          onClick={() => setShowAllProfiles(false)}
        >
          <div
            className="all-profiles-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="all-profiles-close"
              onClick={() => setShowAllProfiles(false)}
            >
              ×
            </button>

            <div className="all-profiles-header">
              <span>OASIS</span>
              <h2>전체 프로필</h2>
              <p>현재 오아시스 멤버들을 만나보세요.</p>
            </div>

            <div className="all-profiles-list">
              <div className="all-profile-card">
                <img src={liamGallagher} alt="Liam Gallagher" />
                <h3>Liam Gallagher</h3>
                <strong>Vocals</strong>
              </div>

              <div className="all-profile-card">
                <img src={noelGallagher} alt="Noel Gallagher" />
                <h3>Noel Gallagher</h3>
                <strong>Guitar / Vocals</strong>
              </div>

              <div className="all-profile-card">
                <img src={gemArcher} alt="Gem Archer" />
                <h3>Gem Archer</h3>
                <strong>Guitar</strong>
              </div>

              <div className="all-profile-card">
                <img src={andyBell} alt="Andy Bell" />
                <h3>Andy Bell</h3>
                <strong>Bass</strong>
              </div>

              <div className="all-profile-card">
                <img src={joeyWaronker} alt="Joey Waronker" />
                <h3>Joey Waronker</h3>
                <strong>Drums</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
