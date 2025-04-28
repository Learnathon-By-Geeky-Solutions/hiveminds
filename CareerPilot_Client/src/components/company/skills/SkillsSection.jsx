import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkillsService from "@/services/SkillsService";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CreateSkillDialog from "./CreateSkillDialog";
import UpdateSkillDialog from "./UpdateSkillDialog";

const SkillsSection = () => {
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isUpdateSkillOpen, setIsUpdateSkillOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await SkillsService.getSkills();
      //   console.log("Fetched skills:", response.data); // For debugging
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await SkillsService.deleteSkill(id);
      await fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Skills</h2>
          <p className="text-muted-foreground">
            Add and manage skills for your company
          </p>
        </div>
        <Button
          onClick={() => setIsAddSkillOpen(true)}
          className="flex items-center gap-2 rounded-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SI No</TableHead>
              <TableHead>Skills Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill, index) => (
              <TableRow
                key={skill.skillId || index}
                className="hover:bg-muted/50 transition-colors duration-200"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{skill.skillName}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-blue-400 hover:bg-blue-400"
                    onClick={() => {
                      setSelectedSkillId(skill.skillId);
                      setIsUpdateSkillOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-red-400 hover:bg-red-500"
                    onClick={() => {
                      setDeleteDialog(true);
                      setSelectedSkillId(skill.skillId);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Skills Dialog */}
      <CreateSkillDialog
        open={isAddSkillOpen}
        onOpenChange={setIsAddSkillOpen}
        onSkillCreated={fetchSkills}
      />
      <UpdateSkillDialog
        open={isUpdateSkillOpen}
        onOpenChange={setIsUpdateSkillOpen}
        onSkillUpdated={fetchSkills}
        skillId={selectedSkillId}
      />
      <DeleteConfirmationDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        title="Are you sure want to delete skill?"
        description="This action cannot be undone. This will permanently delete the skill."
        onConfirm={() => {
          handleDelete(selectedSkillId);
        }}
      />
    </div>
  );
};

export default SkillsSection;
