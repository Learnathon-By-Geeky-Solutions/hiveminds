import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import SkillsService from "@/services/SkillsService";

const AddSkillInJob = ({ onAddSkill }) => {
  const [skills, setSkills] = useState([]); // All skills fetched from the backend
  const [selectedSkill, setSelectedSkill] = useState(""); // Selected skill ID
  const [proficiencyLevel, setProficiencyLevel] = useState(""); // Selected proficiency level
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controls dialog visibility
  const [error, setError] = useState(""); // Error handling state

  useEffect(() => {
    fetchSkills();
  }, []);

  // Fetch all skills from the backend
  const fetchSkills = async () => {
    try {
      const response = await SkillsService.getSkills();
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Failed to fetch skills. Please try again later.");
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedSkill || !proficiencyLevel) {
      setError("Please select both a skill and a proficiency level.");
      return;
    }

    // Find the selected skill object
    const selectedSkillObject = skills.find(
      (skill) => skill.skillId.toString() === selectedSkill
    );

    if (!selectedSkillObject) {
      setError("Invalid skill selected.");
      return;
    }

    // Create the new skill object
    const newSkill = {
      skillId: selectedSkill,
      skillName: selectedSkillObject.skillName,
      proficiencyLevel: proficiencyLevel,
    };

    // Pass the new skill to the parent via the callback
    onAddSkill(newSkill);

    // Reset form fields and close dialog
    setSelectedSkill("");
    setProficiencyLevel("");
    setIsDialogOpen(false);
    setError("");
  };

  return (
    <div className="space-y-4">
      {/* Add Skill Button */}
      <Button onClick={() => setIsDialogOpen(true)}>Add Skill</Button>

      {/* Add Skill Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Skill</DialogTitle>
            <DialogDescription>
              Select a skill and your proficiency level.
            </DialogDescription>
          </DialogHeader>

          {/* Error Message */}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {/* Skill Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="skill">Skill</Label>
            <Select
              value={selectedSkill}
              onValueChange={(value) => {
                setSelectedSkill(value);
                setError(""); // Clear error when a skill is selected
              }}
            >
              <SelectTrigger id="skill">
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <SelectItem key={skill.skillId} value={skill.skillId.toString()}>
                      {skill.skillName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No skills available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Proficiency Level Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="proficiency">Proficiency Level</Label>
            <Select
              value={proficiencyLevel}
              onValueChange={(value) => {
                setProficiencyLevel(value);
                setError(""); // Clear error when a proficiency level is selected
              }}
            >
              <SelectTrigger id="proficiency">
                <SelectValue placeholder="Select a proficiency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGINNER">Beginner</SelectItem>
                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                <SelectItem value="EXPERT">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dialog Footer */}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSkillInJob;