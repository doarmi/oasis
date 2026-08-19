import { createContext, useContext, useEffect, useState } from 'react';
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
        try {
            if (provider !== 'google') {
                setToast('현재 Google 로그인만 지원합니다.');

                setTimeout(() => {
                    setToast('');
                }, 2200);

                return;
            }

            await signInWithPopup(auth, googleProvider);

            setToast('로그인되었습니다.');

            setTimeout(() => {
                setToast('');
            }, 2200);
        } catch (error) {
            console.error('Google login error:', error);

            setToast('로그인에 실패했습니다.');

            setTimeout(() => {
                setToast('');
            }, 2200);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);

            setToast('로그아웃되었습니다.');

            setTimeout(() => {
                setToast('');
            }, 2200);
        } catch (error) {
            console.error('Logout error:', error);

            setToast('로그아웃에 실패했습니다.');

            setTimeout(() => {
                setToast('');
            }, 2200);
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