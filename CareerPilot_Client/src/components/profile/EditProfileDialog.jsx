import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import UserService from "@/services/UserService";

const UpdateProfileDialog = ({ open, onOpenChange }) => {
  const { user, setUser } = useUser();

  // Initialize form data with all fields, including username
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    country: user.country || "",
    experienceYears: user.experienceYears || "",
    industry: user.industry || "",
    availabilityStatus: user.availabilityStatus || "available",
    preferredWorkingHours: user.preferredWorkingHours || "",
    language: user.language || "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const normalizedFormData = {
        ...formData,
        availabilityStatus: formData.availabilityStatus.toUpperCase(),
      };

      console.log("Updated Profile Data:", normalizedFormData);

      // --> Problem in this

      // const response = await UserService.updateCurrentUserProfile(
      //   normalizedFormData
      // );

      // console.log("Profile Updated Successfully:", response.data);

      // Update the context with the new data
      setUser((prevUser) => ({ ...prevUser, ...normalizedFormData }));

      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
       
          {/* First Name */}
          <div className="grid gap-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name */}
          <div className="grid gap-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          {/* Country */}
          <div className="grid gap-1">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="Enter your country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          {/* Years of Experience */}
          <div className="grid gap-1">
            <Label htmlFor="experienceYears">Years of Experience</Label>
            <Input
              id="experienceYears"
              name="experienceYears"
              type="number"
              placeholder="Enter years of experience"
              value={formData.experienceYears}
              onChange={handleInputChange}
            />
          </div>

          {/* Industry */}
          <div className="grid gap-1">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              placeholder="Enter your industry"
              value={formData.industry}
              onChange={handleInputChange}
            />
          </div>

          {/* Availability Status */}
          <div className="grid gap-1">
            <Label htmlFor="availabilityStatus">Availability Status</Label>
            <Select
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  availabilityStatus: value,
                }))
              }
            >
              <SelectTrigger id="availabilityStatus">
                <SelectValue placeholder="Select availability status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Working Hours */}
          <div className="grid gap-1">
            <Label htmlFor="preferredWorkingHours">
              Preferred Working Hours
            </Label>
            <Textarea
              id="preferredWorkingHours"
              name="preferredWorkingHours"
              placeholder="Describe your preferred working hours"
              value={formData.preferredWorkingHours}
              onChange={handleInputChange}
            />
          </div>

          {/* Language */}
          <div className="grid gap-1">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              name="language"
              placeholder="Enter your preferred language"
              value={formData.language}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <DialogFooter>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;