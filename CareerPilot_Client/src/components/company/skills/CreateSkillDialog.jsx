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
import { useState } from "react";

const CreateSkillDialog = ({ open, onOpenChange, onSkillCreated }) => {
  const [skill, setSkill] = useState({
    skillName: "",
  });
  const [errors, setErrors] = useState({
    skillName: "",
    apiError: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ skillName: "", apiError: "" });

    // Validation
    if (!skill.skillName.trim()) {
      setErrors((prev) => ({ ...prev, skillName: "Skill name is required" }));
      return;
    }

    setIsLoading(true);
    try {
      // For debugging purposes
      //   console.log("Creating skill:", skill);
      await SkillsService.addSkill(skill);
      onSkillCreated?.();
      setSkill({ skillName: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating skill:", error);

      // Handle API errors
      if (error.response) {
        setErrors((prev) => ({
          ...prev,
          apiError: error.response.data.message || "Failed to create skill",
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
          <DialogTitle className="text-xl font-bold">
            Create New Skill
          </DialogTitle>
          <DialogDescription>
            Add a new skill to your company's skill list.
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
              value={skill.skillName}
              onChange={(e) => {
                setSkill({ skillName: e.target.value });
                setErrors((prev) => ({ ...prev, skillName: "" }));
              }}
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
              onClick={() => {
                setErrors({ skillName: "", apiError: "" });
                setSkill({ skillName: "" });
                onOpenChange(false);
              }}
              className="rounded-md"
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-md" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSkillDialog;
