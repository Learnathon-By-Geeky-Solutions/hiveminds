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
import SkillsService from "@/services/SkillsService";
import { useEffect, useState } from "react";

const UpdateSkillDialog = ({ open, onOpenChange, onSkillUpdated, skillId }) => {
  const [updatedSkill, setUpdatedSkill] = useState({
    skillName: "",
  });
  const [errors, setErrors] = useState({
    skillName: "",
    apiError: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the skill data when the dialog opens
  useEffect(() => {
    if (open && skillId) {
      const fetchSkill = async () => {
        try {
          const response = await SkillsService.getSkillById(skillId);
          setUpdatedSkill({ skillName: response.data.skillName });
        } catch (error) {
          console.error("Error fetching skill:", error);
          setErrors((prev) => ({
            ...prev,
            apiError: "Failed to load skill data",
          }));
        }
      };
      fetchSkill();
    } else {
      setUpdatedSkill({ skillName: "" }); // Reset the state when the dialog is closed
    }
  }, [open, skillId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ skillName: "", apiError: "" });

    // Validation
    if (!updatedSkill.skillName.trim()) {
      setErrors((prev) => ({
        ...prev,
        skillName: "Skill name is required",
      }));
      return;
    }

    setIsLoading(true);
    try {
      await SkillsService.updateSkill(skillId, updatedSkill); // Call the update API with the skill ID
      onSkillUpdated?.(); // Refresh the skills list
      onOpenChange(false); // Close the dialog
    } catch (error) {
      console.error("Error updating skill:", error);

      // Handle API errors
      if (error.response) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.response.data.message || "Failed to update skill",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          apiError: "An unexpected error occurred. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Update Skill</DialogTitle>
          <DialogDescription>
            Update the details for the selected skill.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Skill Name Input */}
          <div className="space-y-2">
            <Label htmlFor="skillName" className="text-right">
              Skill Name
            </Label>
            <Input
              id="skillName"
              placeholder="Enter skill name"
              value={updatedSkill.skillName}
              onChange={(e) => setUpdatedSkill({ skillName: e.target.value })}
              className={`${
                errors.skillName ? "border-destructive" : ""
              } p-6 rounded-md`}
            />
            {errors.skillName && (
              <p className="text-sm text-destructive">{errors.skillName}</p>
            )}
          </div>

          {/* API Error */}
          {errors.apiError && (
            <p className="text-sm text-destructive">{errors.apiError}</p>
          )}

          {/* Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-md"
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-md" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSkillDialog;
