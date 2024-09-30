import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    if (!token) return; // Check if token exists before fetching user data

    try {
      const response = await fetch("https://bloggist-backend.onrender.com/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]); // Trigger whenever token changes

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, storeTokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
