import { useEffect, useState } from 'react';
import {
  Outlet,
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import OasisCursor from './OasisCursor';
import Header from './Header';
import Drawer from './Drawer';
import BottomNav from './BottomNav';

import definitelyMaybe from '../assets/definitely-maybe.jpg';
import morningGlory from '../assets/morning-glory.jpg';
import beHereNow from '../assets/be-here-now.jpg';

export default function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { toast } = useAuth();
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  /* =========================================================
     PAGE CHANGE
     페이지가 바뀌면 Drawer 닫기
     ========================================================= */
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="oasis-desktop-shell">

      {/* CUSTOM LP CURSOR */}
      <OasisCursor />


      {/* =====================================================
          LEFT DESKTOP LANDING
          ===================================================== */}
      <aside className="oasis-desktop-intro">

        <div className="oasis-desktop-intro-inner">

          <span className="oasis-desktop-kicker">
            MANCHESTER · 1991
          </span>

          <h1>
            LIVE
            <br />
            FOREVER.
          </h1>

          <p className="oasis-desktop-description">
            영국 맨체스터에서 시작된 전설.
            <br />
            OASIS의 음악과 이야기,
            <br />
            그리고 새로운 순간을 만나보세요.
          </p>


          {/* =================================================
              DESKTOP QUICK LINKS
              ================================================= */}
          <div className="oasis-desktop-links">

            <NavLink
              to="/story"
              className={({ isActive }) =>
                isActive
                  ? 'desktop-link-active'
                  : ''
              }
            >
              <span>THE STORY</span>
              <strong>→</strong>
            </NavLink>


            <NavLink
              to="/members"
              className={({ isActive }) =>
                isActive
                  ? 'desktop-link-active'
                  : ''
              }
            >
              <span>MEMBERS</span>
              <strong>→</strong>
            </NavLink>


            <NavLink
              to="/music"
              className={({ isActive }) =>
                isActive
                  ? 'desktop-link-active'
                  : ''
              }
            >
              <span>MUSIC</span>
              <strong>→</strong>
            </NavLink>


            <NavLink
              to="/live"
              className={({ isActive }) =>
                isActive
                  ? 'desktop-link-active'
                  : ''
              }
            >
              <span>LIVE</span>
              <strong>→</strong>
            </NavLink>


            <NavLink
              to="/edition"
              className={({ isActive }) => {
                const isStoreActive =
                  isActive ||
                  location.pathname.startsWith('/customize') ||
                  location.pathname.startsWith('/cart');

                return isStoreActive
                  ? 'desktop-link-active'
                  : '';
              }}
            >
              <span>OFFICIAL STORE</span>
              <strong>→</strong>
            </NavLink>


            <NavLink
              to="/saved"
              className={({ isActive }) =>
                isActive
                  ? 'desktop-link-active'
                  : ''
              }
            >
              <span>SAVED</span>
              <strong>→</strong>
            </NavLink>

          </div>


          {/* =================================================
              ALBUM PREVIEW
              ================================================= */}
          <div className="oasis-desktop-albums">

            <Link
              to="/edition"
              className="oasis-desktop-album"
              aria-label="Definitely Maybe 보기"
            >
              <img
                src={definitelyMaybe}
                alt="Definitely Maybe"
              />

              <span>1994</span>
            </Link>


            <Link
              to="/edition"
              className="oasis-desktop-album"
              aria-label="Morning Glory 보기"
            >
              <img
                src={morningGlory}
                alt="What's the Story Morning Glory"
              />

              <span>1995</span>
            </Link>


            <Link
              to="/edition"
              className="oasis-desktop-album"
              aria-label="Be Here Now 보기"
            >
              <img
                src={beHereNow}
                alt="Be Here Now"
              />

              <span>1997</span>
            </Link>

          </div>


          <p className="oasis-desktop-footer">
            OASIS · DEFINITELY MAYBE · LIVE FOREVER
          </p>

        </div>

      </aside>


      {/* =====================================================
          RIGHT MOBILE WEB PREVIEW
          ===================================================== */}
      <section className="oasis-phone-stage">

        <div className="oasis-phone">

          <div className="app-container">

            {/* HEADER */}
            <Header
              toggleDrawer={toggleDrawer}
            />


            {/* DRAWER */}
            <Drawer
              isOpen={isDrawerOpen}
              toggleDrawer={toggleDrawer}
            />


            <main className="content-area">
              <Outlet />
            </main>

            {/* AUTH TOAST */}
            {toast && (
              <div className="auth-toast">
                {toast}
              </div>
            )}


            {/* BOTTOM NAV */}
            <BottomNav />

          </div>

        </div>

      </section>

    </div>
  );
}