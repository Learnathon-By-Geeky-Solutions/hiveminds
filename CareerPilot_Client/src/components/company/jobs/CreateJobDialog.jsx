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
import { useState } from "react";
import SkillsComponent from "./SkillsComponent";

const CreateJobDialog = ({ open, onOpenChange }) => {
  const { company } = useCompany();

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    requirements: "",
    jobCategory: "",
    location: "",
    upperSalary: "",
    lowerSalary: "",
    applicationDeadline: "",
    jobType: "",
    status: "",
    fulfilled: false,
    skills: [],
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required";
    }
    if (!formData.jobCategory.trim()) {
      newErrors.jobCategory = "Job category is required";
    }
    if (!formData.location.trim()) {
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
    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    // console.log("Validation Errors:", newErrors); // Debugging line
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

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

  // Handle form submission
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (validateForm()) {
  //       const submitData = {
  //         ...formData,
  //         lowerSalary: parseInt(formData.lowerSalary),
  //         upperSalary: parseInt(formData.upperSalary),
  //         skills: formData.skills, // Send the skills array as-is
  //       };
  //       console.log("Submit data:", submitData);
  //         // Call the API to create a new job post

  //     }
  //   };

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
        })), // Format skills array as required by the backend
      };

      console.log("Submit data:", submitData);

      try {
        const companyId = parseInt(company?.id);
        if (!companyId) {
          console.error("Company ID is missing. Cannot create job post.");
          return;
        }

        console.log(submitData);
        console.log("Company ID:", companyId);

        // Call the API to create a new job post
        const response = await JobPostService.addNewJobPost(
          submitData,
          companyId
        );

        // Log the response for debugging
        console.log("Job post created successfully:", response.data);

        // Optionally, reset the form or close the dialog
        setFormData({
          jobTitle: "",
          jobDescription: "",
          requirements: "",
          jobCategory: "",
          location: "",
          upperSalary: "",
          lowerSalary: "",
          applicationDeadline: "",
          jobType: "",
          status: "",
          fulfilled: false,
          skills: [],
        });

        // Close the dialog after successful submission
        onOpenChange(false);
      } catch (error) {
        // Handle errors (e.g., show an error message to the user)
        console.error(
          "Error creating job post:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Job Post
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the new job position.
          </DialogDescription>
        </DialogHeader>
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
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
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
                value={formData.fulfilled.toString()}
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
          <SkillsComponent
            onSkillsChange={handleSkillsChange}
            error={errors.skills}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Job Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;
