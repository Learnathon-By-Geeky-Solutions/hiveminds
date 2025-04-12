import CustomLoader from "@/components/CustomLoader";
import CompanyService from "@/services/CompanyService";
import JobPostService from "@/services/JobPostService";
import SkillsService from "@/services/SkillsService";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [publicJobs, setPublicJobs] = useState([]);
  const [publicJobLoading, setPublicJobLoading] = useState(true);
  const [publicJobError, setPublicJobError] = useState(null);
  const { token } = useAuth();
  const { user } = useUser();

  const userId = user?.id || null; // Get the user ID from the user context

  // Fetch public jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await JobPostService.getAllPublicJobPosts();
        if (response.status !== 200) {
          throw new Error(response.data?.message || "Failed to fetch jobs");
        }
        setPublicJobs(response.data);
      } catch (err) {
        console.error(
          "Error fetching jobs:",
          err.response?.data || err.message
        );
        setPublicJobError(
          err.response?.data?.message ||
            "Failed to load jobs. Please try again later."
        );
      } finally {
        setPublicJobLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch skills
  useEffect(() => {
    let isMounted = true;

    const fetchSkills = async () => {
      if (!isMounted) return;
      setSkillsLoading(true);
      try {
        const response = await SkillsService.getSkills();
        if (isMounted) {
          setSkills(response.data);
          // console.log("Skills fetched successfully:", skills); // Log the fetched skills
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        if (isMounted) {
          setSkills([]);
        }
      } finally {
        if (isMounted) {
          setSkillsLoading(false);
        }
      }
    };

    fetchSkills();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Fetch company data based on userId
  useEffect(() => {
    let isMounted = true; 

    const fetchCompanyData = async (userId) => {
      if (!isMounted) return; 
      setCompanyLoading(true);
      try {
        const response = await CompanyService.getCompanyProfileById(userId);
        const data = response.data;
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setCompany(data[0]);
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
    <CompanyContext.Provider
      value={{
        company,
        setCompany,
        companyLoading,
        skills,
        setSkills,
        skillsLoading,
        publicJobs,
        setPublicJobs,
        publicJobError,
        publicJobLoading,
      }}
    >
      {companyLoading ? <CustomLoader /> : children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
