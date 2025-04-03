import CompanyService from "@/services/CompanyService";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";
import CustomLoader from "@/components/CustomLoader";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const { token } = useAuth();
  const { user } = useUser();

  const userId = user?.id || null; // Get the user ID from the user context

  useEffect(() => {
    let isMounted = true; // Track whether the component is still mounted

    const fetchCompanyData = async (userId) => {
      if (!isMounted) return; // Prevent state updates if the component is unmounted
      setCompanyLoading(true);
      try {
        console.log("Fetching company data for userId:", userId); // Log userId
        const response = await CompanyService.getCompanyProfileById(userId);
        const data = response.data;

        console.log("API Response:", data); // Log the API response

        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setCompany(data[0]); // Extract the first object from the array
            console.log("Company Data Set:", data[0]);
          } else if (data === null || data === undefined) {
            console.warn("API returned null or undefined for userId:", userId);
            setCompany(null); // No company exists
          } else {
            console.warn("Unexpected API response format:", data);
            setCompany(null); // Handle unexpected response
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching company data:", error);
          setCompany(null); // Reset company state in case of an error
        }
      } finally {
        if (isMounted) {
          setCompanyLoading(false); // Ensure loading is set to false after API call completes
          console.log("Loading state set to false");
        }
      }
    };

    if (userId) {
      console.log("UserId detected:", userId); // Log when userId is available
      fetchCompanyData(userId);
    } else {
      console.log("UserId is null or undefined"); // Log when userId is missing
      setCompanyLoading(false); // Ensure loading is set to false if userId is missing
    }

    return () => {
      isMounted = false; // Cleanup function to prevent state updates after unmount
    };
  }, [userId, token]);

  return (
    <CompanyContext.Provider value={{ company, setCompany, companyLoading }}>
      {companyLoading ? <CustomLoader/> : children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
