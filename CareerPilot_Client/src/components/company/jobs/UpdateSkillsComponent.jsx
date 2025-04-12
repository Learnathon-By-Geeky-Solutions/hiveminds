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
import { useEffect, useState } from "react";

const PROFICIENCY_LEVELS = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
};

const UpdateSkillsComponent = ({
  onSkillsChange,
  error,
  initialSkills = [],
}) => {
  const { skills } = useCompany();
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Initialize with existing skills
  useEffect(() => {
    if (initialSkills?.length > 0) {
      setSelectedSkills(initialSkills);
    }
  }, [initialSkills]);

  const handleAddSkill = (skillId) => {
    if (!skillId) return;

    const parsedSkillId = parseInt(skillId);
    if (!selectedSkills.some((s) => s.skillId === parsedSkillId)) {
      const updatedSkills = [
        ...selectedSkills,
        { skillId: parsedSkillId, proficiencyLevel: "BEGINNER" },
      ];
      setSelectedSkills(updatedSkills);
      onSkillsChange?.(updatedSkills);
    }
  };

  const handleRemoveSkill = (skillId) => {
    const updatedSkills = selectedSkills.filter((s) => s.skillId !== skillId);
    setSelectedSkills(updatedSkills);
    onSkillsChange?.(updatedSkills);
  };

  const handleProficiencyChange = (skillId, level) => {
    const updatedSkills = selectedSkills.map((skill) =>
      skill.skillId === skillId ? { ...skill, proficiencyLevel: level } : skill
    );
    setSelectedSkills(updatedSkills);
    onSkillsChange?.(updatedSkills);
  };

  const getSkillName = (skillId) => {
    if (!skillId || !Array.isArray(skills)) return "";
    const skill = skills.find((s) => s.skillId === Number(skillId));
    return skill?.skillName || "";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Update Skills</Label>
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
            <SelectValue placeholder="Add or modify skills" />
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

export default UpdateSkillsComponent;
