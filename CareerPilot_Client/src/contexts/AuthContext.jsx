import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  login: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") || null
  ); // Initialize token from localStorage
  
  // Enhanced setToken function that handles token storage
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token); // Save token in localStorage
    } else {
      localStorage.removeItem("ACCESS_TOKEN"); // Remove token from localStorage
    }
  };
  
  // New login function that handles both token setting and user data preparation
  const login = (token) => {
    setToken(token); // Set the token in state and localStorage
    // The UserContext will automatically detect the token change and fetch user data
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
