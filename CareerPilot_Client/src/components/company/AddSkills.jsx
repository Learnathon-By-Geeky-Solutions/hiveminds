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
import { useState } from "react";
import SkillsService from "@/services/SkillsService";

const AddSkills = ({ open, onOpenChange }) => {
  const [skill, setSkill] = useState({
    skillName: "",
  });
  const [error, setError] = useState("");

  // Helper function to update the skill state
  const inputOnChange = (property, value) => {
    setSkill((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  // Handle adding a skill
  const handleAddSkill = () => {
    setError(""); // Clear previous error messages

    // Validate skill name
    if (!skill.skillName.trim()) {
      setError("Skill name is required.");
      return;
    }

    // Call the service to add the skill
    SkillsService.addSkill(skill)
      .then((response) => {
        console.log("Skill added successfully:", response.data);
        alert("Skill added successfully!");
        setSkill({ skillName: "" }); // Clear input after successful addition
        onOpenChange(false); // Close the dialog
      })
      .catch((error) => {
        console.error("Error adding skill:", error);

        // Extract error message from the backend response
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(`Error: ${error.response.data.message}`);
        } else {
          setError("Failed to add skill. Please try again.");
        }
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>
            Enter a single skill to add. You can add more skills later.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="skill">Skill</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="e.g., React, Python, UI Design"
                value={skill.skillName}
                onChange={(e) => {
                  inputOnChange("skillName", e.target.value);
                  setError(""); // Clear error on input change
                }}
                className={`p-4 rounded-md ${
                  error ? "border-destructive" : ""
                }`}
              />
              <Button onClick={handleAddSkill} className="rounded-md">
                Add
              </Button>
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-md"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkills;
