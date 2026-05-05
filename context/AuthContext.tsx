"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { User, UserRole, AuthState } from "@/types";
import { loginUser, registerUser } from "@/services/mockServices";

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false };
    case "LOGOUT":
      return { ...initialState };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(
    async (
      email: string,
      password: string,
      role: UserRole
    ): Promise<boolean> => {
      dispatch({ type: "LOGIN_START" });
      try {
        const user = await loginUser(
          email,
          password,
          role as "client" | "provider"
        );
        if (user) {
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
          return true;
        }
        dispatch({ type: "LOGIN_FAILURE" });
        return false;
      } catch {
        dispatch({ type: "LOGIN_FAILURE" });
        return false;
      }
    },
    []
  );

  const register = useCallback(async (userData: Partial<User>): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = await registerUser(userData);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return true;
    } catch {
      dispatch({ type: "LOGIN_FAILURE" });
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
