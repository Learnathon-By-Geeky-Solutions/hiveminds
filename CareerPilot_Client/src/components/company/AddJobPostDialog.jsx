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
import AddSkillInJob from "./AddSkillInJob";

const AddJobPostDialog = ({ open, onOpenChange }) => {
  const { companyApi } = useCompany();
  const companyId = companyApi?.id || null;

  // State for form data
  const [formData, setFormData] = useState({
    companyId: companyId,
    jobTitle: "",
    jobDescription: "",
    requirements: "",
    lowerSalary: "",
    upperSalary: "",
    location: "",
    jobType: "",
    jobCategory: "",
    applicationDeadline: "",
    fulfilled: false,
    skills: [],
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

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

    // if (!formData.deptId) {
    //   newErrors.deptId = "Company selection is required.";
    // }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required.";
    }
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required.";
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required.";
    }
    if (!formData.lowerSalary.trim() || isNaN(formData.lowerSalary)) {
      newErrors.lowerSalary = "Lower salary is required and must be a number.";
    }
    if (!formData.upperSalary.trim() || isNaN(formData.upperSalary)) {
      newErrors.upperSalary = "Upper salary is required and must be a number.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }
    if (!formData.jobType) {
      newErrors.jobType = "Job type selection is required.";
    }
    if (!formData.jobCategory.trim()) {
      newErrors.jobCategory = "Job category is required.";
    }
    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = "Application deadline is required.";
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill must be selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Callback function to update skills in formData
  const handleAddSkill = (newSkill) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: [...prevFormData.skills, newSkill], // Append the new skill
    }));
  };

  // Function to remove a skill by index
  const handleRemoveSkill = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // API call to save the job post
      JobPostService.addNewJobPost(formData, companyId)
        .then((response) => {
          console.log("Job post created successfully:", response.data);
          // Reset form data and close the dialog
          setFormData({
            // deptId: "",
            companyId: "",
            jobTitle: "",
            jobDescription: "",
            requirements: "",
            upperSalary: "",
            lowerSalary: "",
            location: "",
            jobType: "",
            jobCategory: "",
            applicationDeadline: "",
            fulfilled: false,
            skills: [],
          });
          onOpenChange(false);
        })
        .catch((error) => {
          console.error("Error creating job post:", error);
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add New Job Post</DialogTitle>
          <DialogDescription>
            Enter the details for the new job posting. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company and Job Title */}
          <div className="grid grid-cols-2 gap-4">
            {/* <div className="space-y-2">
              <Label htmlFor="deptId">Department</Label>
              <Select
                value={formData.deptId}
                onValueChange={(value) =>
                  handleSelectChange("deptId", value)
                }
              >
                <SelectTrigger
                  className={errors.deptId ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select a Department" />
                </SelectTrigger>
                <SelectContent>
                  {mockDept.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.deptId && (
                <p className="text-sm text-destructive">{errors.deptId}</p>
              )}
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="Senior Software Engineer"
                value={formData.jobTitle}
                onChange={handleChange}
                className={errors.jobTitle ? "border-destructive" : ""}
              />
              {errors.jobTitle && (
                <p className="text-sm text-destructive">{errors.jobTitle}</p>
              )}
            </div>
          </div>

          {/* Job Description and Requirements */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Describe the job role and responsibilities"
                value={formData.jobDescription}
                onChange={handleChange}
                className={`min-h-[200px] ${
                  errors.jobDescription ? "border-destructive" : ""
                }`}
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
                placeholder="List the required skills and qualifications"
                value={formData.requirements}
                onChange={handleChange}
                className={`min-h-[200px] ${
                  errors.requirements ? "border-destructive" : ""
                }`}
              />
              {errors.requirements && (
                <p className="text-sm text-destructive">
                  {errors.requirements}
                </p>
              )}
            </div>
          </div>

          {/* Salary Range, Location, and Job Type */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lowerSalary">Lower Salary</Label>
              <Input
                id="lowerSalary"
                name="lowerSalary"
                type="number"
                placeholder="Enter lower salary"
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
                placeholder="Enter upper salary"
                value={formData.upperSalary}
                onChange={handleChange}
                className={errors.upperSalary ? "border-destructive" : ""}
              />
              {errors.upperSalary && (
                <p className="text-sm text-destructive">{errors.upperSalary}</p>
              )}
            </div>

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
          </div>

          {/* Job Type and Job Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => handleSelectChange("jobType", value)}
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
              <Label htmlFor="jobCategory">Job Category</Label>
              <Input
                id="jobCategory"
                name="jobCategory"
                placeholder="Engineering"
                value={formData.jobCategory}
                onChange={handleChange}
                className={errors.jobCategory ? "border-destructive" : ""}
              />
              {errors.jobCategory && (
                <p className="text-sm text-destructive">{errors.jobCategory}</p>
              )}
            </div>
          </div>

          {/* Application Deadline and Is Fulfilled */}
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

            <div className="flex items-center space-x-2 mt-6">
              <input
                id="fulfilled"
                name="fulfilled"
                type="checkbox"
                checked={formData.fulfilled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fulfilled: e.target.checked,
                  }))
                }
              />
              <Label htmlFor="fulfilled">Job Fulfilled</Label>
            </div>
          </div>

          {/* Skills Section */}
          <div className="flex flex-col space-y-2">
            <h3>Skills</h3>
            <div className="flex flex-row space-x-4 items-center">
              {/* Add Skill Button */}
              <AddSkillInJob onAddSkill={handleAddSkill} />

              {/* Display Current Skills */}
              <div className="flex-grow">
                {/* <h4 className="text-sm font-medium mb-2">Added Skills:</h4> */}
                {formData.skills.length > 0 ? (
                  <ul className="flex flex-row flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="flex items-center px-3 py-1 rounded-md text-sm"
                      >
                        <span>
                          {skill.skillName} - {skill.proficiencyLevel}
                        </span>
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No skills added yet.</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Post Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobPostDialog;
