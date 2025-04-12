import CustomLoader from "@/components/CustomLoader";
import { useCompany } from "@/contexts/CompanyContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Company = () => {
  const { company, companyLoading } = useCompany();
  const navigate = useNavigate();

  // Handle navigation based on company existence
  useEffect(() => {
    if (companyLoading) return; // Wait for loading to complete

    if (!company) {
      navigate("/profile/company/create", { replace: true });
    } else {
      navigate("/profile/company/dashboard", { replace: true });
    }
  }, [company, companyLoading, navigate]);

  // Show loader while data is being fetched
  if (companyLoading) {
    return (
      <div>
        <CustomLoader />
      </div>
    );
  }

  return <Outlet />;
};

export default Company;
