import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ApiResponseDto } from "../types/api.response.dto";
import { AuthDto, LoginResponseDto, User } from "../types/auth.response.dto";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: ({ email, password }: AuthDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const value = { user, isAuthenticated: !!user, login, logout };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function login({ email, password }: AuthDto) {
    try {
      const user = { email, password };
      const response = await api.post("/auth/login", user);
      const loginResponse = response.data as ApiResponseDto<LoginResponseDto>;
      if (loginResponse.success && loginResponse.data) {
        const access_token = loginResponse.data?.access_token;
        const user = loginResponse.data?.user;
        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", access_token);
        setUser(user);
      }
    } catch (error) {
      console.log("Login failed:", error);
      throw error;
    }
  }


  async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
