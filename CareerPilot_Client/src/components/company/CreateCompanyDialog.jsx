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
import { useState } from "react";

const CreateCompanyDialog = ({ open, onOpenChange, onSave }) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    employeeCount: "",
    foundedYear: "",
    description: "",
    logo: "/placeholder.svg?height=128&width=128",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCompany = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID for demo purposes
      ...formData,
      employeeCount: Number(formData.employeeCount),
      foundedYear: formData.foundedYear
        ? Number(formData.foundedYear)
        : new Date().getFullYear(),
    };

    // Call the onSave callback if provided
    if (onSave) {
      onSave(newCompany);
    }

    // Reset form and close the dialog
    setFormData({
      name: "",
      industry: "",
      location: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      employeeCount: "",
      foundedYear: "",
      description: "",
      logo: "/placeholder.svg?height=128&width=128",
    });
    onOpenChange(false);
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
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="Technology"
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
                placeholder="San Francisco, CA"
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
                placeholder="2010"
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
                placeholder="contact@acme.com"
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

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                placeholder="+1 (555) 123-4567"
                value={formData.contactPhone}
                onChange={handleChange}
                className={errors.contactPhone ? "border-destructive" : ""}
              />
              {errors.contactPhone && (
                <p className="text-sm text-destructive">
                  {errors.contactPhone}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                placeholder="https://acme.com"
                value={formData.website}
                onChange={handleChange}
                className={errors.website ? "border-destructive" : ""}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeCount">Employee Count</Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                type="number"
                placeholder="100"
                value={formData.employeeCount}
                onChange={handleChange}
                className={errors.employeeCount ? "border-destructive" : ""}
              />
              {errors.employeeCount && (
                <p className="text-sm text-destructive">
                  {errors.employeeCount}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              placeholder="/placeholder.svg?height=128&width=128"
              value={formData.logo}
              onChange={handleChange}
              className={errors.logo ? "border-destructive" : ""}
            />
            {errors.logo && (
              <p className="text-sm text-destructive">{errors.logo}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the company"
              value={formData.description}
              onChange={handleChange}
              className={`min-h-[100px] ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
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
            <Button type="submit">Save Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompanyDialog;
