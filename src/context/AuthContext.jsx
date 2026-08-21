import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    browserLocalPersistence,
    getRedirectResult,
    onAuthStateChanged,
    setPersistence,
    signInWithPopup,
    signInWithRedirect,
    signOut,
} from 'firebase/auth';

import { auth, googleProvider } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [toast, setToast] = useState('');
    const [loading, setLoading] = useState(true);

    const showToast = (message) => {
        setToast(message);

        window.setTimeout(() => {
            setToast('');
        }, 2200);
    };

    /*
      로그인 상태를 브라우저에 유지합니다.
      새로고침/재접속 후에도 로그인 상태를 복원할 수 있습니다.
    */
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence);
            } catch (error) {
                console.error(
                    'Auth persistence error:',
                    error.code,
                    error.message,
                );
            }
        };

        initializeAuth();
    }, []);

    /*
      Firebase 로그인 상태 감지
    */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (firebaseUser) => {
                if (firebaseUser) {
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        name:
                            firebaseUser.displayName ||
                            'Oasis User',
                        photoURL: firebaseUser.photoURL,
                        provider: 'google',
                    });
                } else {
                    setUser(null);
                }

                setLoading(false);
            },
        );

        return unsubscribe;
    }, []);

    /*
      모바일 Google Redirect 로그인 완료 후
      OASIS로 돌아왔을 때 결과 확인
    */
    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);

                if (result?.user) {
                    showToast('로그인되었습니다.');
                }
            } catch (error) {
                console.error(
                    'Google redirect result error:',
                    error.code,
                    error.message,
                );

                showToast(
                    `로그인 실패: ${error.code || 'unknown'
                    }`,
                );
            }
        };

        handleRedirectResult();
    }, []);

    const login = async (provider = 'google') => {
        if (provider !== 'google') {
            showToast(
                '현재 Google 로그인만 지원합니다.',
            );
            return;
        }

        try {
            await setPersistence(
                auth,
                browserLocalPersistence,
            );

            const isMobile =
                /Android|iPhone|iPad|iPod|Mobile/i.test(
                    navigator.userAgent,
                );

            if (isMobile) {
                /*
                  모바일:
                  팝업 차단을 피하기 위해 Redirect 사용
                */
                await signInWithRedirect(
                    auth,
                    googleProvider,
                );

                return;
            }

            /*
              데스크톱:
              기존 Popup 방식 사용
            */
            const result = await signInWithPopup(
                auth,
                googleProvider,
            );

            if (result.user) {
                showToast('로그인되었습니다.');
            }
        } catch (error) {
            console.error(
                'Google login error:',
                error.code,
                error.message,
            );

            if (
                error.code ===
                'auth/popup-closed-by-user'
            ) {
                showToast(
                    'Google 로그인이 취소되었습니다.',
                );
                return;
            }

            if (
                error.code === 'auth/popup-blocked'
            ) {
                showToast(
                    '로그인 팝업이 차단되었습니다.',
                );
                return;
            }

            showToast(
                `로그인 실패: ${error.code || 'unknown'
                }`,
            );
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);

            showToast('로그아웃되었습니다.');
        } catch (error) {
            console.error(
                'Logout error:',
                error.code,
                error.message,
            );

            showToast(
                '로그아웃에 실패했습니다.',
            );
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                toast,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}