import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    getRedirectResult,
    onAuthStateChanged,
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

        setTimeout(() => {
            setToast('');
        }, 2200);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || 'Oasis User',
                    photoURL: firebaseUser.photoURL,
                    provider: 'google',
                });
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    /*
      모바일 redirect 로그인 후
      OASIS 사이트로 돌아왔을 때 결과를 확인합니다.
    */
    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);

                if (result?.user) {
                    showToast('로그인되었습니다.');
                }
            } catch (error) {
                console.error(
                    'Google redirect login error:',
                    error.code,
                    error.message,
                );

                showToast('로그인에 실패했습니다.');
            }
        };

        checkRedirectResult();
    }, []);

    const login = async (provider = 'google') => {
        try {
            if (provider !== 'google') {
                showToast('현재 Google 로그인만 지원합니다.');
                return;
            }

            const isMobile =
                /Android|iPhone|iPad|iPod|Mobile/i.test(
                    navigator.userAgent,
                );

            if (isMobile) {
                /*
                  모바일:
                  팝업 대신 Google 로그인 페이지로 이동한 뒤
                  로그인 완료 후 사이트로 돌아옵니다.
                */
                await signInWithRedirect(auth, googleProvider);
                return;
            }

            /*
              데스크톱:
              기존 팝업 로그인 방식을 유지합니다.
            */
            await signInWithPopup(auth, googleProvider);

            showToast('로그인되었습니다.');
        } catch (error) {
            console.error(
                'Google login error:',
                error.code,
                error.message,
            );

            showToast('로그인에 실패했습니다.');
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

            showToast('로그아웃에 실패했습니다.');
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