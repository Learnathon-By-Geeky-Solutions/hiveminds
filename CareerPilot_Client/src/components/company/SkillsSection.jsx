import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
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
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import SkillsService from "@/services/SkillsService";
  import { Pencil, Trash2 } from "lucide-react";
  import { useEffect, useState } from "react";
  
  const SkillsSection = () => {
    const [skills, setSkills] = useState([]);
    const [deleteSkillId, setDeleteSkillId] = useState(null); 
    const [updateSkillId, setUpdateSkillId] = useState(null); 
    const [updatedSkillName, setUpdatedSkillName] = useState(""); 
    const [error, setError] = useState("");
  
    useEffect(() => {
      fetchSkills();
    }, [skills]);
  
    const fetchSkills = async () => {
      try {
        const response = await SkillsService.getSkills();
        // console.log("Fetched skills:", response.data); 
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
  
    const handleDelete = async () => {
      if (!deleteSkillId) return;
  
      try {
        await SkillsService.deleteSkill(deleteSkillId);
        await fetchSkills(); // Refresh skills list
      } catch (error) {
        console.error("Error deleting skill:", error);
      } finally {
        setDeleteSkillId(null); // Reset delete ID
      }
    };
  
    const handleUpdate = async () => {
      if (!updateSkillId || !updatedSkillName.trim()) {
        setError("Skill name cannot be empty");
        return;
      }
  
      try {
        await SkillsService.updateSkill(updateSkillId, { skillName: updatedSkillName });
        await fetchSkills(); // Refresh skills list
        setUpdateSkillId(null); // Reset update ID
        setUpdatedSkillName(""); // Clear input
        setError(""); // Clear error
      } catch (error) {
        console.error("Error updating skill:", error);
        setError("Failed to update skill");
      }
    };
  
    return (
      <div className="space-y-4">
        {/* Skills Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SI No</TableHead>
              <TableHead>Skills Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill, index) => (
              <TableRow key={skill.skillId}> {/* Use `skillId` as the unique key */}
                <TableCell>{index + 1}</TableCell>
                <TableCell>{skill.skillName}</TableCell>
                <TableCell className="text-right space-x-2">
                  {/* Update Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      console.log("Opening update dialog for skill ID:", skill.skillId);
                      setUpdateSkillId(skill.skillId); // Set `skillId` for update
                      setUpdatedSkillName(skill.skillName); // Pre-fill skill name
                    }}
                    className="h-8 w-8 border-blue-400 hover:bg-blue-400"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      console.log("Opening delete dialog for skill ID:", skill.skillId);
                      setDeleteSkillId(skill.skillId); // Set `skillId` for deletion
                    }}
                    className="h-8 w-8 border-red-400 hover:bg-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deleteSkillId} // Open dialog if `deleteSkillId` is set
          onOpenChange={(open) => {
            if (!open) setDeleteSkillId(null); // Reset `deleteSkillId` when closed
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Skill</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this skill? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
  
        {/* Update Dialog */}
        <Dialog
          open={!!updateSkillId} // Open dialog if `updateSkillId` is set
          onOpenChange={(open) => {
            if (!open) {
              setUpdateSkillId(null); // Reset `updateSkillId` when closed
              setUpdatedSkillName(""); // Clear input
              setError(""); // Clear error
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Skill</DialogTitle>
              <DialogDescription>
                Edit the skill name and click save to update.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  value={updatedSkillName}
                  onChange={(e) => setUpdatedSkillName(e.target.value)}
                  className={error ? "border-destructive" : ""}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUpdateSkillId(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default SkillsSection;