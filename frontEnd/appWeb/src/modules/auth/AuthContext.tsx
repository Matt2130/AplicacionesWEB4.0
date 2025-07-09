import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children : React.ReactNode }) {
    const [token, setToken] =useState<string | null>(null)

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken){
            setToken(localToken)
        }
    }, []);

    const login = (loginToken:string) => {
        localStorage.setItem('token', loginToken);
        setToken(loginToken)
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null)
    };

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext)
};