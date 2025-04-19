import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompany } from "@/contexts/CompanyContext";
import { useUser } from "@/contexts/UserContext";
import CompanyService from "@/services/CompanyService";
import {
  Building,
  Edit,
  Mail,
  MapPin,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCompanyDialog from "./EditCompanyDialog";

const Overview = ({ company }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const { setCompany } = useCompany();

  if (!company) {
    return (
      <p className="text-center text-[hsl(var(--foreground))]">
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
    <div className="container mx-auto p-4 space-y-6">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
        {/* Company Overview Card (Spans 3 columns on medium screens) */}
        <Card className="md:col-span-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm rounded-[var(--radius)] overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Company Logo */}
              <Avatar className="h-20 w-20 border-2 border-[hsl(var(--border))]">
                <AvatarImage src={company.logo} alt={company.companyName} />
                <AvatarFallback className="text-xl bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
                  {company.companyName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Company Details */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-[hsl(var(--card-foreground))] text-gradient">
                      {company.companyName}
                    </h2>
                    {/* <p className="text-sm text-[hsl(var(--card-foreground))]">
                      {company.industry}
                    </p> */}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="
                        h-9 w-9 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]
                        hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]
                        rounded-[var(--radius)] border border-[hsl(var(--border))]"
                      variant="outline"
                      size="icon"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit Company</span>
                    </Button>
                    <Button
                      className="
                        h-9 w-9 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]
                        hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]
                        rounded-[var(--radius)] border border-[hsl(var(--border))]"
                      variant="outline"
                      size="icon"
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete Company</span>
                    </Button>
                  </div>
                </div>

                {/* Company Description */}
                <div className="space-y-1">
                  {/* <p className="text-sm font-medium text-[hsl(var(--card-foreground))]">
                    Description
                  </p> */}
                  <p className="text-sm text-[hsl(var(--card-foreground))] max-w-2xl">
                    {company.descriptions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Admins Card (Single column) */}
        <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm rounded-[var(--radius)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium text-[hsl(var(--card-foreground))]">
              Admins
            </CardTitle>
            <ShieldCheck className="h-6 w-6 text-[hsl(var(--card-foreground))]" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-[hsl(var(--card-foreground))]">
              Created By: {user.username}
            </p>
            <select
              className="
                w-full border border-[hsl(var(--border))] rounded-[var(--radius)] p-2
                bg-[hsl(var(--background))] text-[hsl(var(--foreground))]
                focus:ring-2 focus:ring-[hsl(var(--ring))]"
            >
              <option value="">Select Users for Admins</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
          </CardContent>
        </Card>

        {/* Contact Information Card (Spans 2 columns) */}
        <Card className="md:col-span-2 bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm rounded-[var(--radius)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-[hsl(var(--card-foreground))]">
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-[hsl(var(--card-foreground))]" />
              <div>
                {/* <p className="text-sm font-medium text-[hsl(var(--card-foreground))]">
                  Email
                </p> */}
                <p className="text-sm text-[hsl(var(--card-foreground))]">
                  {company.contactEmail}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-[hsl(var(--card-foreground))]" />
              <div>
                {/* <p className="text-sm font-medium text-[hsl(var(--card-foreground))]">
                  Location
                </p> */}
                <p className="text-sm text-[hsl(var(--card-foreground))]">
                  {company.location}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Info Card (Single column) */}
        <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm rounded-[var(--radius)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-[hsl(var(--card-foreground))]">
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-[hsl(var(--card-foreground))]" />
              <div>
                <p className="text-sm font-medium text-[hsl(var(--card-foreground))]">
                  Total Employees
                </p>
                <p className="text-sm text-[hsl(var(--card-foreground))]">
                  {company.noOfEmployee}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Industry Card (Single column) */}
        <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-sm rounded-[var(--radius)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-[hsl(var(--card-foreground))]">
              Industry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-[hsl(var(--card-foreground))]" />
              <div>
                <p className="text-sm text-[hsl(var(--card-foreground))]">
                  {company.industry}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
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
    </div>
  );
};

export default Overview;
