"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditJobPostDialog = ({
  open,
  onOpenChange,
  jobPost,
  companies,
  onSave,
}) => {
  // Initialize form data with jobPost details
  const [formData, setFormData] = useState({
    id: jobPost?.id || "",
    title: jobPost?.title || "",
    company_id: jobPost?.company_id?.toString() || "",
    location: jobPost?.location || "",
    type: jobPost?.type || "",
    category: jobPost?.category || "",
    salary: jobPost?.salary || "",
    deadline: jobPost?.deadline || "",
    description: jobPost?.description || "",
    requirements: jobPost?.requirements || "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Update form data when the jobPost prop changes
  useEffect(() => {
    if (jobPost) {
      setFormData({
        id: jobPost.id,
        title: jobPost.title,
        company_id: jobPost.company_id?.toString() || "",
        location: jobPost.location,
        type: jobPost.type,
        category: jobPost.category,
        salary: jobPost.salary,
        deadline: jobPost.deadline,
        description: jobPost.description,
        requirements: jobPost.requirements,
      });
    }
  }, [jobPost]);

  // Handle input changes for text and date fields
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

  // Handle select changes for dropdowns
  const handleSelectChange = (name, value) => {
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

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required.";
    }
    if (!formData.company_id) {
      newErrors.company_id = "Company selection is required.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }
    if (!formData.type) {
      newErrors.type = "Job type selection is required.";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }
    if (!formData.salary.trim()) {
      newErrors.salary = "Salary range is required.";
    }
    if (!formData.deadline) {
      newErrors.deadline = "Application deadline is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Job description is required.";
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData); // Pass the updated form data to the parent component
      onOpenChange(false); // Close the dialog after submission
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Job Post</DialogTitle>
          <DialogDescription>
            Update the job posting details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_id">Company</Label>
              <Select
                value={formData.company_id}
                onValueChange={(value) => handleSelectChange("company_id", value)}
              >
                <SelectTrigger className={errors.company_id ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.company_id && <p className="text-sm text-destructive">{errors.company_id}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? "border-destructive" : ""}
              />
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={errors.salary ? "border-destructive" : ""}
              />
              {errors.salary && <p className="text-sm text-destructive">{errors.salary}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className={errors.deadline ? "border-destructive" : ""}
              />
              {errors.deadline && <p className="text-sm text-destructive">{errors.deadline}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className={`min-h-[100px] ${errors.requirements ? "border-destructive" : ""}`}
            />
            {errors.requirements && <p className="text-sm text-destructive">{errors.requirements}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobPostDialog;