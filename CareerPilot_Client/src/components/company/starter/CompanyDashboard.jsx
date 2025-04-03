import CustomLoader from "@/components/CustomLoader";
import { useCompany } from "@/contexts/CompanyContext";
import { TabsContent } from "@radix-ui/react-tabs";
import JobSection from "../jobs/JobSection";
import Overview from "../overview/OverView";
import SkillsSection from "../skills/SkillsSection";
import TabsWrapper from "./TabsWrapper";
import EmployeeSection from "../employee/EmployeeSection";

const CompanyDashboard = () => {
  const { company, companyLoading } = useCompany();
  if (companyLoading) return <CustomLoader />;
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gradient">
        {company.companyName} Dashboard
      </h1>
      <TabsWrapper>
        <TabsContent value="overview">
          <Overview company={company} />
        </TabsContent>
        <TabsContent value="jobs">
          <JobSection />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsSection />
        </TabsContent>
        <TabsContent value="employees">
            <EmployeeSection/>
        </TabsContent>
      </TabsWrapper>
    </div>
  );
};

export default CompanyDashboard;
