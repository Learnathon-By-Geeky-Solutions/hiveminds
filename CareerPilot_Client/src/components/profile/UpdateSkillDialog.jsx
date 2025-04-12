import SkillsService from "@/services/SkillsService";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const proficiencyOptions = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "EXPERT", label: "Expert" },
];

const UpdateSkillDialog = ({ open, onOpenChange, skill, onSkillUpdated }) => {
  // Null safety check
  if (!skill) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedProficiency, setSelectedProficiency] = useState(
    skill.proficiencyLevel || "BEGINNER"
  );

  const handleSave = () => {
    if (selectedProficiency !== skill.proficiencyLevel) {
      SkillsService.updateUserSkill(skill.id, {
        proficiencyLevel: selectedProficiency,
      })
        .then(() => {
          onSkillUpdated?.(); 
        })
        .catch((error) => {
          console.error("Error updating skill:", error);
        });
    }
    onOpenChange(false); 
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Skill Proficiency</DialogTitle>
        </DialogHeader>

        {/* Display the skill name */}
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <label
              htmlFor="skillName"
              className="text-sm font-medium leading-none peer-disabled:opacity-70"
            >
              Skill Name
            </label>
            <p className="text-lg font-semibold">{skill.skillName}</p>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="proficiency"
              className="text-sm font-medium leading-none peer-disabled:opacity-70"
            >
              Proficiency Level
            </label>
            <select
              id="proficiency"
              value={selectedProficiency}
              onChange={(e) => setSelectedProficiency(e.target.value)}
              className="w-full p-2 border rounded bg-white text-black"
            >
              {proficiencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={selectedProficiency === skill.proficiencyLevel}
            className={`px-4 py-2 text-sm ${
              selectedProficiency !== skill.proficiencyLevel
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } rounded-md`}
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSkillDialog;
