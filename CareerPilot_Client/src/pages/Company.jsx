import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  Building2,
  Mail,
  MapPin,
  Phone,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmployeeSection from "@/components/company/EmployeeSection";
import JobSection from "@/components/company/JobSection";
import EditCompanyDialog from "@/components/company/EditCompanyDialog"; // Import the dialog

const Company = () => {
  // Define state for company data
  const [company, setCompany] = useState({
    name: "Example Corp",
    logo: "/example-logo.png",
    industry: "Technology",
    foundedYear: 2010,
    description: "A leading technology company focused on innovation.",
    location: "San Francisco, CA",
    contactEmail: "info@example.com",
    contactPhone: "+1 234 567 890",
    employeeCount: 150,
  });

  // Define state for metrics
  const [metrics, setMetrics] = useState({
    employeeGrowth: 12,
    openPositions: 10,
    newHires: 5,
  });

  // State for modals and actions
  const [editCompanyOpen, setEditCompanyOpen] = useState(false);
  const [deleteCompanyOpen, setDeleteCompanyOpen] = useState(false);

  // Handle updating company data
  const handleUpdateCompany = (updatedData) => {
    setCompany((prevCompany) => ({
      ...prevCompany,
      ...updatedData, // Merge updated fields with existing company data
    }));
  };

  return (
    <div className="container mx-auto py-6 space-y-8 m-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{company.name} Dashboard</h1>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="jobs">Job Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Company Profile Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="text-2xl">{company.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{company.name}</h2>
                      <p className="text-muted-foreground">
                        {company.industry} • Founded {company.foundedYear}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => setEditCompanyOpen(true)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Company</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteCompanyOpen(true)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Company</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm md:text-base max-w-3xl">{company.description}</p>
                </div>
              </div>
            </div>
            <CardContent className="grid gap-6 p-6 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Location</p>
                  <p className="text-sm text-muted-foreground">{company.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Email</p>
                  <p className="text-sm text-muted-foreground">{company.contactEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Phone</p>
                  <p className="text-sm text-muted-foreground">{company.contactPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{company.employeeCount}</div>
                <div className="flex items-center pt-1">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-500">+{metrics.employeeGrowth}% from last quarter</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.openPositions}</div>
                <div className="flex items-center pt-1">
                  <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{metrics.newHires} new hires in the last 30 days</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Department Growth</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6 Departments</div>
                <div className="flex items-center pt-1">
                  <Building2 className="mr-1 h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Engineering is the largest department</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Employees</CardTitle>
                <CardDescription>Manage all employees at {company.name}</CardDescription>
              </div>
              <Button>Add Employee</Button>
            </CardHeader>
            <CardContent>
              <EmployeeSection />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Job Posts</CardTitle>
                <CardDescription>Manage all job postings for {company.name}</CardDescription>
              </div>
              <Button>Add Job Post</Button>
            </CardHeader>
            <CardContent>
              <JobSection />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Company Dialog */}
      <EditCompanyDialog
        company={company}
        open={editCompanyOpen}
        onOpenChange={setEditCompanyOpen}
        onSave={handleUpdateCompany}
      />
    </div>
  );
};

export default Company;