import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import CompanyService from "@/services/CompanyService";
import { Edit, Mail, MapPin, ShieldCheck, Trash2, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCompanyDialog from "./EditCompanyDialog";
import { useCompany } from "@/contexts/CompanyContext";

const Overview = ({ company }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const {setCompany} = useCompany();
  if (!company) {
    return (
      <p className="text-center text-muted-foreground">
        No company data available.
      </p>
    );
  }

  const handleDelete = async () => {
    try {
      await CompanyService.deleteCompany(company.id);
      setCompany(null);
      navigate("/profile/company/create", { replace: true });
      console.log("Company deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      {/* Main Company Card */}
      <Card className="overflow-hidden rounded-sm">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Company Logo */}
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={company.logo} alt={company.companyName} />
              <AvatarFallback className="text-2xl">
                {company.companyName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Company Details */}
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{company.companyName}</h2>
                  <p className="text-muted-foreground">{company.industry}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="h-10 w-10 border-blue-400 hover:bg-blue-400 rounded-sm"
                    variant="outline"
                    size="icon"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Company</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setIsDeleteOpen(true);
                    }}
                    className="h-10 w-10 border-red-400 hover:bg-red-500 rounded-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Company</span>
                  </Button>
                </div>
              </div>

              {/* Company Description */}
              <p className="text-sm md:text-base max-w-3xl">
                {company.descriptions}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <CardContent className="grid gap-6 p-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-blue-400" />
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">Location</p>
              <p className="text-base text-muted-foreground">
                {company.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 text-blue-400" />
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">Email</p>
              <p className="text-base text-muted-foreground">
                {company.contactEmail}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-blue-400" />
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">
                Total Employee
              </p>
              <p className="text-base text-muted-foreground">
                {company.noOfEmployee}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Admins */}
        <Card className="overflow-hidden rounded-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Admins</CardTitle>
            <ShieldCheck className="h-8 w-8 text-blue-400" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div>Created By: {user.username}</div>
            <select className="border bg-blue-950 rounded-md p-2 mt-2">
              <option value="">Select Users for Admins</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
          </CardContent>
        </Card>
      </div>
      <EditCompanyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        company={company}
      />
      <DeleteConfirmationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Company"
        description="Are you sure you want to delete this company? This action cannot be undone."
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Overview;
