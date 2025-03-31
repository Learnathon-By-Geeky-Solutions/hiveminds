import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CompanyService from "@/services/CompanyService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCompanyDialog = ({ open, onOpenChange }) => {
  // State for form data
  const [formData, setFormData] = useState({
    companyName: "",
    descriptions: "",
    industry: "",
    location: "",
    contactEmail: "",
    noOfEmployee: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleChange = (property, value) => {
    setFormData((prev) => ({
      ...prev,
      [property]: value,
    }));

    // Clear error when field is edited
    if (errors[property]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[property];
        return newErrors;
      });
    }
  };

  const navigate = useNavigate();

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.contactEmail)
    ) {
      newErrors.contactEmail = "Invalid email format.";
    }
    if (!formData.noOfEmployee.trim() || isNaN(formData.noOfEmployee)) {
      newErrors.noOfEmployee =
        "Employee count is required and must be a number.";
    }
    if (!formData.descriptions.trim()) {
      newErrors.descriptions = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      CompanyService.createCompany(formData)
        .then((response) => {
          console.log("Company created successfully:", response.data);
          setFormData({
            companyName: "",
            descriptions: "",
            industry: "",
            location: "",
            contactEmail: "",
            noOfEmployee: "",
          });
          onOpenChange(false);
          navigate("/profile/company", { replace: true });
        })
        .catch((error) => {
          console.error("Error creating company:", error);
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            Enter the details for the new company. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Acme Corporation"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className={errors.companyName ? "border-destructive" : ""}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="Technology"
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                className={errors.industry ? "border-destructive" : ""}
              />
              {errors.industry && (
                <p className="text-sm text-destructive">{errors.industry}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                placeholder="contact@acme.com"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className={errors.contactEmail ? "border-destructive" : ""}
              />
              {errors.contactEmail && (
                <p className="text-sm text-destructive">
                  {errors.contactEmail}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeCount">Employee Count</Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                type="number"
                placeholder="100"
                value={formData.noOfEmployee}
                onChange={(e) => handleChange("noOfEmployee", e.target.value)}
                className={errors.noOfEmployee ? "border-destructive" : ""}
              />
              {errors.noOfEmployee && (
                <p className="text-sm text-destructive">
                  {errors.noOfEmployee}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the company"
              value={formData.descriptions}
              onChange={(e) => handleChange("descriptions", e.target.value)}
              className={`min-h-[100px] ${
                errors.descriptions ? "border-destructive" : ""
              }`}
            />
            {errors.descriptions && (
              <p className="text-sm text-destructive">{errors.descriptions}</p>
            )}
          </div>

          {/* Commented-out code remains unchanged */}
          {/* <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              placeholder="/placeholder.svg?height=128&width=128"
              value={formData.logo}
              onChange={(e) => handleChange("logo", e.target.value)}
            />
          </div> */}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompanyDialog;
