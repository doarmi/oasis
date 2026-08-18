import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [toast, setToast] = useState('');

    const login = (provider) => {
        setUser({
            provider,
            email: 'demo@oasis.com',
            name: 'Oasis User',
        });

        setToast('로그인되었습니다.');

        setTimeout(() => {
            setToast('');
        }, 2200);
    };

    const logout = () => {
        setUser(null);
        setToast('로그아웃되었습니다.');

        setTimeout(() => {
            setToast('');
        }, 2200);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                toast,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}