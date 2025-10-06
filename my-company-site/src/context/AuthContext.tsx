import { createContext, useState, useEffect, type ReactNode } from "react";
import { loginUser, registerUser, logoutUser } from "../utils/auth";
import type { AuthContextType } from "../types/auth";

// Explicit type parameter instead of `{}` or `null`
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      setUser("authenticated-user");
      localStorage.setItem("token", token);
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    setToken(data.token);
    setUser(data.user?.username || "user");
  };

  const register = async (username: string, email: string, password: string) => {
    await registerUser(username, email, password);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
