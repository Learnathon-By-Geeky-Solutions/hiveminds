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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const CreateMemberDialog = ({
  open,
  onOpenChange,
  onMemberCreated,
  communityId,
}) => {
  const [memberData, setMemberData] = useState({
    name: "",
    role: "member",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      ...memberData,
      communityId,
      joinDate: new Date().toLocaleDateString(),
      contributions: 0,
    };

    onMemberCreated(newMember);
    onOpenChange(false);
    setMemberData({ name: "", role: "member" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Member
          </DialogTitle>
          <DialogDescription>
            Add a new member to the community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Member name"
              value={memberData.name}
              onChange={(e) =>
                setMemberData({ ...memberData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Select
              value={memberData.role}
              onValueChange={(value) =>
                setMemberData({ ...memberData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Add Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemberDialog;
