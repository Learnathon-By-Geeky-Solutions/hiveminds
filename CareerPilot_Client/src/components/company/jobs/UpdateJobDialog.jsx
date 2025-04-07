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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCompany } from "@/contexts/CompanyContext";
import JobPostService from "@/services/JobPostService";
import { useEffect, useState } from "react";
import UpdateSkillsComponent from "./UpdateSkillsComponent";

const UpdateJobDialog = ({ open, onOpenChange, onSuccess, jobData = {} }) => {
  const { company } = useCompany();
  const [formData, setFormData] = useState({
    jobTitle: jobData?.jobTitle || "",
    jobDescription: jobData?.jobDescription || "",
    requirements: jobData?.requirements || "",
    jobCategory: jobData?.jobCategory || "",
    location: jobData?.location || "",
    upperSalary: jobData?.upperSalary || "",
    lowerSalary: jobData?.lowerSalary || "",
    applicationDeadline: jobData?.applicationDeadline?.split("T")[0] || "",
    jobType: jobData?.jobType || "",
    status: jobData?.status || "",
    fulfilled: jobData?.fulfilled || false,
    skills: jobData?.skills || [],
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.jobTitle?.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!formData?.jobDescription?.trim()) {
      newErrors.jobDescription = "Job description is required";
    }
    if (!formData?.requirements?.trim()) {
      newErrors.requirements = "Requirements are required";
    }
    if (!formData?.jobCategory?.trim()) {
      newErrors.jobCategory = "Job category is required";
    }
    if (!formData?.location?.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.lowerSalary) {
      newErrors.lowerSalary = "Lower salary is required";
    }
    if (!formData.upperSalary) {
      newErrors.upperSalary = "Upper salary is required";
    }
    if (Number(formData.lowerSalary) > Number(formData.upperSalary)) {
      newErrors.upperSalary = "Upper salary must be greater than lower salary";
    }
    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = "Application deadline is required";
    } else {
      const selectedDate = new Date(formData.applicationDeadline);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.applicationDeadline = "Deadline cannot be in the past";
      }
    }
    if (!formData.jobType) {
      newErrors.jobType = "Job type is required";
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
    }
    if (!formData.skills || formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Initialize form with job data
  useEffect(() => {
    if (jobData) {
      const formattedData = {
        ...jobData,
        applicationDeadline: jobData.applicationDeadline?.split("T")[0],
        // Normalize skills array
        skills:
          jobData.skills?.map((skill) => ({
            skillId: parseInt(skill.skill.skillId), // Extract skillId from nested skill object
            proficiencyLevel: skill.proficiencyLevel || "BEGINNER",
          })) || [],
        status: jobData.status || "OPEN",
        jobType: jobData.jobType || "FULL_TIME",
        fulfilled: jobData.fulfilled || false,
      };
      setFormData(formattedData);
    }
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle skills change from child component
  const handleSkillsChange = (updatedSkills) => {
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills, // Update the skills array
    }));
    if (errors.skills) {
      setErrors((prev) => ({
        ...prev,
        skills: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        lowerSalary: parseInt(formData.lowerSalary),
        upperSalary: parseInt(formData.upperSalary),
        skills: formData.skills.map((skill) => ({
          skillId: skill.skillId,
          proficiencyLevel: skill.proficiencyLevel,
        })),
      };
      try {
        const companyId = parseInt(company?.id);
        if (!companyId) {
          console.error("Company ID is missing. Cannot update job post.");
          return;
        }
        await JobPostService.updateJobPost(companyId, jobData.id, submitData);
        onSuccess?.();
        onOpenChange(false);
      } catch (error) {
        console.error(
          "Error updating job post:",
          error.response?.data || error.message
        );
      }
    }
  };

  // Status options array for better management
  const statusOptions = [
    { value: "OPEN", label: "Open" },
    { value: "CLOSED", label: "Closed" },
    { value: "PENDING", label: "Pending" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Job Post
          </DialogTitle>
          <DialogDescription>
            Update the details for this job position.
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={errors.jobTitle ? "border-destructive" : ""}
              />
              {errors.jobTitle && (
                <p className="text-sm text-destructive">{errors.jobTitle}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobCategory">Job Category</Label>
                <Input
                  id="jobCategory"
                  name="jobCategory"
                  value={formData.jobCategory}
                  onChange={handleChange}
                  className={errors.jobCategory ? "border-destructive" : ""}
                />
                {errors.jobCategory && (
                  <p className="text-sm text-destructive">
                    {errors.jobCategory}
                  </p>
                )}
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
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location}</p>
                )}
              </div>
            </div>
            {/* Job Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  rows={6}
                  onChange={handleChange}
                  className={errors.jobDescription ? "border-destructive" : ""}
                />
                {errors.jobDescription && (
                  <p className="text-sm text-destructive">
                    {errors.jobDescription}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  rows={6}
                  onChange={handleChange}
                  className={errors.requirements ? "border-destructive" : ""}
                />
                {errors.requirements && (
                  <p className="text-sm text-destructive">
                    {errors.requirements}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Job Type and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select
                name="jobType"
                value={formData.jobType}
                onValueChange={(value) => {
                  handleChange({ target: { name: "jobType", value } });
                }}
              >
                <SelectTrigger
                  className={errors.jobType ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_TIME">Full Time</SelectItem>
                  <SelectItem value="PART_TIME">Part Time</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                  <SelectItem value="INTERNSHIP">Internship</SelectItem>
                  <SelectItem value="TEMPORARY">Temporary</SelectItem>
                </SelectContent>
              </Select>
              {errors.jobType && (
                <p className="text-sm text-destructive">{errors.jobType}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => {
                  handleChange({ target: { name: "status", value } });
                }}
              >
                <SelectTrigger
                  className={errors.status ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-destructive">{errors.status}</p>
              )}
            </div>
          </div>
          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lowerSalary">Lower Salary</Label>
              <Input
                id="lowerSalary"
                name="lowerSalary"
                type="number"
                value={formData.lowerSalary}
                onChange={handleChange}
                className={errors.lowerSalary ? "border-destructive" : ""}
              />
              {errors.lowerSalary && (
                <p className="text-sm text-destructive">{errors.lowerSalary}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="upperSalary">Upper Salary</Label>
              <Input
                id="upperSalary"
                name="upperSalary"
                type="number"
                value={formData.upperSalary}
                onChange={handleChange}
                className={errors.upperSalary ? "border-destructive" : ""}
              />
              {errors.upperSalary && (
                <p className="text-sm text-destructive">{errors.upperSalary}</p>
              )}
            </div>
          </div>
          {/* Application Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="applicationDeadline">Application Deadline</Label>
              <Input
                id="applicationDeadline"
                name="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className={
                  errors.applicationDeadline ? "border-destructive" : ""
                }
              />
              {errors.applicationDeadline && (
                <p className="text-sm text-destructive">
                  {errors.applicationDeadline}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Fulfilled Status</Label>
              <RadioGroup
                value={formData.fulfilled}
                onValueChange={(value) => {
                  handleChange({
                    target: { name: "fulfilled", value: value === "true" },
                  });
                }}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="fulfilled-yes" />
                  <Label htmlFor="fulfilled-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="fulfilled-no" />
                  <Label htmlFor="fulfilled-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {/* Skills Component */}
          <UpdateSkillsComponent
            onSkillsChange={handleSkillsChange}
            error={errors.skills}
            initialSkills={formData.skills}
          />         
          {/* Footer Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Update Job Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateJobDialog;
