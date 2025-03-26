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
import { useState } from "react";

const AddEmployeeDialog = ({ open, onOpenChange, onSave }) => {
  // Mock companies data
  const mockDepartment = [
    { id: 1, name: "HR" },
    { id: 2, name: "CS" },
    { id: 3, name: "Logi" },
  ];

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company_id: "",
    hireDate: "",
    status: "",
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-gradient font-bold text-xl">
            Add New Employee
          </DialogTitle>
          <DialogDescription className="text-base">
            Enter the details for the new employee. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={
                errors.name ? "border-destructive" : "p-6 text-lg rounded-sm"
              }
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              placeholder="Software Engineer"
              value={formData.jobTitle}
              onChange={handleChange}
              className={
                errors.jobTitle ? "border-destructive" : "p-6 rounded-sm"
              }
            />
            {errors.jobTitle && (
              <p className="text-sm text-destructive">{errors.jobTitle}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_id">Company</Label>
              <Select
                value={formData.company_id}
                onValueChange={(value) =>
                  handleSelectChange("company_id", value)
                }
              >
                <SelectTrigger
                  className={
                    errors.company_id
                      ? "border-destructive"
                      : "p-6 text-base rounded-sm"
                  }
                >
                  <SelectValue placeholder="Select a Department" />
                </SelectTrigger>
                <SelectContent className="rounded-sm p-1">
                  {mockDepartment.map((company) => (
                    <SelectItem
                      className="rounded-sm text-base"
                      key={company.id}
                      value={company.id.toString()}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.company_id && (
                <p className="text-sm text-destructive">{errors.company_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date</Label>
              <Input
                id="hireDate"
                name="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={handleChange}
                className={
                  errors.hireDate
                    ? "border-destructive"
                    : "p-6 bg-secondary text-white rounded-sm"
                }
              />
              {errors.hireDate && (
                <p className="text-sm text-destructive">{errors.hireDate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger
                className={errors.status ? "border-destructive" : "p-6 rounded-sm text-base"}
              >
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent className="rounded-sm p-1">
                <SelectItem className="rounded-sm text-base" value="active">Active</SelectItem>
                <SelectItem className="rounded-sm text-base" value="inactive">Inactive</SelectItem>
                <SelectItem className="rounded-sm text-base" value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">{errors.status}</p>
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
            <Button type="submit">Save Employee</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
