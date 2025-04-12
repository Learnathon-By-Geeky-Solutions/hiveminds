import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsWrapper = ({ children }) => {
  return (
    <Tabs defaultValue="overview" className="w-ful">
      <TabsList className="flex p-6 my-6 rounded-sm justify-between items-center">
        <TabsTrigger className="py-2 px-6 rounded-sm" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger className="py-2 px-6 rounded-sm" value="employees">
          Employees
        </TabsTrigger>
        <TabsTrigger className="py-2 px-6 rounded-sm" value="jobs">
          Jobs
        </TabsTrigger>
        <TabsTrigger className="py-2 px-6 rounded-sm" value="skills">
          Skills
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default TabsWrapper;
