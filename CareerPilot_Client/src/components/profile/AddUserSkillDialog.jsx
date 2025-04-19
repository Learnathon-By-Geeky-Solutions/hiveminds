import { useCompany } from "@/contexts/CompanyContext";
import SkillsService from "@/services/SkillsService";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const proficiencyOptions = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "EXPERT", label: "Expert" },
];

const AddUserSkillDialog = ({ open, onOpenChange, onSkillAdded }) => {
  const { skills } = useCompany();
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState(null);

  const handleAdd = () => {
    if (!selectedSkillId || !selectedProficiency) return;

    const dataToSend = {
      skillId: selectedSkillId,
      proficiencyLevel: selectedProficiency,
    };

    SkillsService.addUserSkill(dataToSend)
      .then((response) => {
        console.log("Skill added successfully:", response.data);
        onSkillAdded?.();
        setSelectedSkillId(null);
        setSelectedProficiency(null);
        onOpenChange(false);
      })
      .catch((error) => {
        console.error("Error adding skill:", error);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">Add Skill</DialogTitle>
        <div className="mb-4">
          <select
            id="skill"
            value={selectedSkillId ? selectedSkillId.toString() : ""}
            onChange={(e) =>
              setSelectedSkillId(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full p-2 border rounded bg-white text-black"
          >
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option
                key={skill.skillId}
                value={skill.skillId}
                className="text-black"
              >
                {skill.skillName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="proficiency" className="block mb-2">
            Proficiency:
          </label>
          <select
            id="proficiency"
            value={selectedProficiency}
            onChange={(e) => setSelectedProficiency(e.target.value)}
            className="w-full p-2 border rounded  bg-white text-black"
          >
            <option value="">Select proficiency</option>
            {proficiencyOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-black"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAdd}
          disabled={!selectedSkillId || !selectedProficiency}
          className={`
    px-4 py-2 rounded font-medium transition-all duration-200
    ${
      selectedSkillId && selectedProficiency
        ? "bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        : "bg-gray-600 text-gray-300 cursor-not-allowed dark:bg-gray-400 dark:text-gray-800 dark:hover:bg-gray-300"
    }
  `}
        >
          Add Skill
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserSkillDialog;
