
import React, { createContext, useContext, useState } from "react";
import { type AppUser } from "./types";

interface AuthContextType {
  user: AppUser | null;
  token: string | null;
  login: (user: AppUser, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = (user: AppUser, token?: string) => {
    setUser(user);
    setToken(token ?? null);
    localStorage.setItem("user", JSON.stringify(user));
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
