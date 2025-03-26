import CompanyService from "@/services/CompanyService";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CompanyContext = createContext();
export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const getCurrentCompanyProfile = async () => {
      setLoading(true);
      try {
        const response = await CompanyService.getAllCompanyProfile();
        setCompany(response.data);
        console.log("Company Data", response.data);
      } catch (error) {
        console.log("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getCurrentCompanyProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <CompanyContext.Provider value={{ company, setCompany, loading }}>
      {loading ? <div>Loading...</div> : children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
