import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    onAuthStateChanged,
    signInWithPopup,
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

    const login = async (provider = 'google') => {
        if (provider !== 'google') {
            showToast('현재 Google 로그인만 지원합니다.');
            return;
        }

        try {
            const result = await signInWithPopup(auth, googleProvider);

            if (result.user) {
                showToast('로그인되었습니다.');
            }
        } catch (error) {
            console.error(
                'Google login error:',
                error.code,
                error.message,
            );

            if (error.code === 'auth/popup-closed-by-user') {
                showToast('Google 로그인이 취소되었습니다.');
            } else if (error.code === 'auth/popup-blocked') {
                showToast('브라우저에서 로그인 팝업을 허용해주세요.');
            } else {
                showToast(`로그인 실패: ${error.code || 'unknown'}`);
            }
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