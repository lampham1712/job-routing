import React, { createContext, useContext, useState } from "react";

const authProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username, password) {
    if (username === "sylam.pham") {
      await new Promise((r) => setTimeout(r, 500));
      authProvider.isAuthenticated = true;
      authProvider.username = username;
      return true;
    }
    return false;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500));
    authProvider.isAuthenticated = false;
    authProvider.username = null;
  },
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = async (username, password) => {
    const success = await authProvider.signin(username, password);
    if (success) {
      setUser(authProvider.username);
    }
    return success;
  };

  const signout = async () => {
    await authProvider.signout();
    setUser(null);
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
