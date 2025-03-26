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
import { useEffect, useState } from "react";

const EditCompanyDialog = ({ company, open, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState({
    id: company.id,
    companyName: company.companyName,
    industry: company.industry,
    location: company.location,
    contactEmail: company.contactEmail,
    // contactPhone: company.contactPhone || "",
    // website: company.website || "",
    noOfEmployee: company.noOfEmployee,
    // foundedYear: company.foundedYear || 2000,
    descriptions: company.descriptions,
    // logo: company.logo || "",
  });

  const [errors, setErrors] = useState({});

  // Update form when company changes
  useEffect(() => {
    if (company) {
      setFormData({
        id: company.id,
        companyName: company.companyName,
        industry: company.industry,
        location: company.location,
        contactEmail: company.contactEmail,
        // contactPhone: company.contactPhone || "",
        // website: company.website || "",
        noOfEmployee: company.noOfEmployee,
        // foundedYear: company.foundedYear || 2000,
        descriptions: company.descriptions,
        // logo: company.logo || "",
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      employeeCount: Number(formData.employeeCount),
      foundedYear: Number(formData.foundedYear),
    };
    onSave(processedData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Company Profile</DialogTitle>
          <DialogDescription>
            Update your company details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
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
                value={formData.industry}
                onChange={handleChange}
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
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                name="foundedYear"
                type="number"
                value={formData.foundedYear}
                onChange={handleChange}
                className={errors.foundedYear ? "border-destructive" : ""}
              />
              {errors.foundedYear && (
                <p className="text-sm text-destructive">{errors.foundedYear}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={errors.contactEmail ? "border-destructive" : ""}
              />
              {errors.contactEmail && (
                <p className="text-sm text-destructive">
                  {errors.contactEmail}
                </p>
              )}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className={errors.contactPhone ? "border-destructive" : ""}
              />
              {errors.contactPhone && (
                <p className="text-sm text-destructive">
                  {errors.contactPhone}
                </p>
              )}
            </div> */}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={errors.website ? "border-destructive" : ""}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website}</p>
              )}
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="employeeCount">Employee Count</Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                type="number"
                value={formData.noOfEmployee}
                onChange={handleChange}
                className={errors.noOfEmployee ? "border-destructive" : ""}
              />
              {errors.employeeCount && (
                <p className="text-sm text-destructive">
                  {errors.noOfEmployee}
                </p>
              )}
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className={errors.logo ? "border-destructive" : ""}
            />
            {errors.logo && (
              <p className="text-sm text-destructive">{errors.logo}</p>
            )}
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="descriptions"
              name="descriptions"
              value={formData.descriptions}
              onChange={handleChange}
              className={`min-h-[100px] ${
                errors.descriptions ? "border-destructive" : ""
              }`}
            />
            {errors.descriptions && (
              <p className="text-sm text-destructive">{errors.descriptions}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyDialog;
