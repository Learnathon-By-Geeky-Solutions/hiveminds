import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SkillsService from "@/services/SkillsService";
import { Edit, ListChecks, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { Button } from "../ui/button";
import AddUserSkillDialog from "./AddUserSkillDialog";

const Skills = () => {
  const [addSkillDialogOpen, setAddSkillDialogOpen] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const fetchUserSkills = async () => {
    try {
      const response = await SkillsService.allUserSkills();
      setUserSkills(response.data);
    } catch (error) {
      console.error("Error fetching user skills:", error);
    }
  };
  // Fetch user skills and tools from API
  useEffect(() => {
    fetchUserSkills();
  }, []);

  // Function to handle skill deletion
  const handleDeleteSkill = async (skillId) => {
    try {
      await SkillsService.deleteUserSkill(skillId);
      fetchUserSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Function to determine badge styling based on proficiencyLevel
  const getLevelBadge = (proficiencyLevel) => {
    const level = proficiencyLevel.toLowerCase();
    switch (level) {
      case "expert":
        return "bg-green-500/20 text-green-300";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-300";
      case "beginner":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-secondary/40 text-muted-foreground";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle className="flex items-center gap-2">
          <ListChecks size={18} className="text-primary" />
          Skills & Tools
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAddSkillDialogOpen(true)}>
            <Plus size={20} className="text-blue-500" />
          </Button>
          <Button variant="outline">
            <Edit size={20} className="text-blue-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userSkills.map((skill, index) => (
            <div
              key={index}
              className="p-4 border rounded-md bg-transparent shadow-sm"
            >
              <div className="flex justify-between mb-1">
                <span>{skill.skillName}</span>
                <Badge
                  className={cn(
                    "font-normal",
                    getLevelBadge(skill.proficiencyLevel)
                  )}
                >
                  {skill.proficiencyLevel}
                </Badge>
                <Button
                  onClick={() => {
                    setSelectedSkill(skill);
                    setDeleteDialog(true);
                  }}
                  className="bg-transparent hover:cursor-pointer hover:bg-transparent"
                >
                  <X size={16} className="text-red-500" />
                </Button>
              </div>
              {/* Removed progress bar since proficiencyLevel is categorical */}
            </div>
          ))}
        </div>
      </CardContent>
      <AddUserSkillDialog
        open={addSkillDialogOpen}
        onOpenChange={setAddSkillDialogOpen}
        onSkillAdded={fetchUserSkills}
      />
      <DeleteConfirmationDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        title="Delete Skill"
        description="Are you sure you want to delete this skill? This action cannot be undone."
        onConfirm={() => {
          handleDeleteSkill(selectedSkill.id);
          setSelectedSkill(null);
          fetchUserSkills();
          setDeleteDialog(false);
        }}
      />
    </Card>
  );
};

export default Skills;
