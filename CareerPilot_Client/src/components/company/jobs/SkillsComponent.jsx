import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompany } from "@/contexts/CompanyContext";
import { X } from "lucide-react";
import { useState } from "react";

const PROFICIENCY_LEVELS = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
};

const SkillsComponent = ({ onSkillsChange, error }) => {
  const { skills } = useCompany();
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Add a skill to the selected list
  const handleAddSkill = (skillId) => {
    if (!skillId) return;

    const parsedSkillId = parseInt(skillId);
    if (!selectedSkills.some((s) => s.skillId === parsedSkillId)) {
      const updatedSkills = [
        ...selectedSkills,
        { skillId: parsedSkillId, proficiencyLevel: "BEGINNER" },
      ];
      setSelectedSkills(updatedSkills);
      onSkillsChange?.(updatedSkills); // Notify the parent of changes
    }
  };

  // Remove a skill from the selected list
  const handleRemoveSkill = (skillId) => {
    const updatedSkills = selectedSkills.filter((s) => s.skillId !== skillId);
    setSelectedSkills(updatedSkills);
    onSkillsChange?.(updatedSkills); // Notify the parent of changes
  };

  // Update proficiency level for a skill
  const handleProficiencyChange = (skillId, level) => {
    const updatedSkills = selectedSkills.map((skill) =>
      skill.skillId === skillId ? { ...skill, proficiencyLevel: level } : skill
    );
    setSelectedSkills(updatedSkills);
    onSkillsChange?.(updatedSkills); // Notify the parent of changes
  };

  // Get skill name by ID with null check
  const getSkillName = (skillId) => {
    if (!skillId || !Array.isArray(skills)) return "";
    const skill = skills.find((s) => s.skillId === skillId);
    return skill?.skillName || "";
  };

  return (
    <div className="space-y-4">
      {/* Skill Selection Dropdown */}
      <div className="space-y-2">
        <Label>Select Skill</Label>
        <Select
          onValueChange={(skillId) => {
            const skill = skills.find((s) => s.skillId === parseInt(skillId));
            if (
              skill &&
              !selectedSkills.some((s) => s.skillId === parseInt(skillId))
            ) {
              handleAddSkill(skillId);
            }
          }}
        >
          <SelectTrigger className={error ? "border-destructive" : ""}>
            <SelectValue placeholder="Choose a skill" />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(skills) &&
              skills
                .filter(
                  (skill) =>
                    skill?.skillId &&
                    !selectedSkills.some((s) => s.skillId === skill.skillId)
                )
                .map((skill) => (
                  <SelectItem key={skill.skillId} value={String(skill.skillId)}>
                    {skill.skillName}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {/* Selected Skills List */}
      {selectedSkills.length > 0 && (
        <div className="space-y-3">
          {selectedSkills.map((skill) => (
            <div
              key={skill.skillId}
              className="flex items-center gap-4 p-3 bg-secondary/20 rounded-md"
            >
              <span className="flex-1 font-medium">
                {getSkillName(skill.skillId)}
              </span>
              <Select
                value={skill.proficiencyLevel}
                onValueChange={(level) =>
                  handleProficiencyChange(skill.skillId, level)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROFICIENCY_LEVELS).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {key.charAt(0) + key.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSkill(skill.skillId)}
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsComponent;
