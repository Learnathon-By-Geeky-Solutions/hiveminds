import UserService from "@/services/UserService";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getCurrentUserProfile();
        setUser(response.data);
      } catch (error) {
        console.log("Error Fetching Data", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
