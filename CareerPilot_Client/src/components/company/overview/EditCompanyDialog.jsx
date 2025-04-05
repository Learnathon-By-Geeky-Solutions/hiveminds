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
import { useCompany } from "@/contexts/CompanyContext";
import CompanyService from "@/services/CompanyService";
import { useState } from "react";

const EditCompanyDialog = ({ open, onOpenChange, company }) => {
  const [formData, setFormData] = useState({
    companyName: company?.companyName || "",
    descriptions: company?.descriptions || "",
    industry: company?.industry || "",
    location: company?.location || "",
    contactEmail: company?.contactEmail || "",
    noOfEmployee: company?.noOfEmployee || 0,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setCompany } = useCompany();

  // Handle input changes
  const handleChange = (property, value) => {
    const updatedValue =
      property === "noOfEmployee" ? parseInt(value, 10) || 0 : value;
    setFormData((prev) => ({
      ...prev,
      [property]: updatedValue,
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

  // Manually validate form fields
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
    if (!formData.noOfEmployee || isNaN(formData.noOfEmployee)) {
      newErrors.noOfEmployee =
        "Employee count is required and must be a number.";
    }
    if (!formData.descriptions.trim()) {
      newErrors.descriptions = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setLoading(true);
      try {
        // console.log("Updated Form Data:", formData);

        // Extract the company ID from the global state
        const companyId = company.id;

        // Call the updateCompany API
        const response = await CompanyService.updateCompany(
          companyId,
          formData
        );

        // Log the updated company data from the server
        // console.log("Company updated successfully:", response.data);

        // Update the global state with the new company data
        setCompany(response.data);

        // Close the dialog after successful update
        onOpenChange(false);
      } catch (error) {
        console.error("Error updating company:", error);
        // Optionally, display an error message to the user
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Company</DialogTitle>
          <DialogDescription>
            Update the details for your company. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Acme Corporation"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className={errors.companyName ? "border-destructive" : ""}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName}</p>
            )}
          </div>

          {/* Industry and Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Technology"
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                className={errors.industry ? "border-destructive" : ""}
              />
              {errors.industry && (
                <p className="text-sm text-destructive">{errors.industry}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
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

          {/* Contact Email and Employee Count */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
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
              <Label htmlFor="noOfEmployee">Employee Count</Label>
              <Input
                id="noOfEmployee"
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="descriptions">Description</Label>
            <Textarea
              id="descriptions"
              placeholder="Brief description of the company"
              rows={10}
              value={formData.descriptions}
              onChange={(e) => handleChange("descriptions", e.target.value)}
              className={errors.descriptions ? "border-destructive" : ""}
            />
            {errors.descriptions && (
              <p className="text-sm text-destructive">{errors.descriptions}</p>
            )}
          </div>

          {/* Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyDialog;
