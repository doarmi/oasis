import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="page-not-found">
            <div className="not-found-inner">

                <span className="not-found-kicker">
                    DEFINITELY LOST
                </span>

                <h1>404</h1>

                <h2>DON'T LOOK BACK.</h2>

                <p>
                    찾으시는 페이지가 사라졌습니다.
                    <br />
                    홈으로 돌아가 OASIS의 이야기를 계속 만나보세요.
                </p>

                <Link
                    to="/"
                    className="not-found-home-btn"
                >
                    BACK TO HOME <span>→</span>
                </Link>

                <div className="not-found-vinyl">
                    <div className="not-found-vinyl-ring"></div>

                    <div className="not-found-vinyl-label">
                        OASIS
                    </div>

                    <div className="not-found-vinyl-hole"></div>
                </div>

            </div>
        </div>
    );
}