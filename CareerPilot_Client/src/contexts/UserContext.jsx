import UserService from "@/services/UserService";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import CustomLoader from "@/components/CustomLoader";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  
  // Function to fetch user data that can be called from outside
  const fetchUserData = async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await UserService.getCurrentUserProfile();
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Error Fetching User Data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data when token changes
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUserData }}>
      {loading ? <CustomLoader/> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
