import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateMemberDialog from "./CreateMemberDialog";

const CommunityUsers = ({ users, communityId }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleMemberCreated = (newMember) => {
    // TODO: Update users list with the new member
    console.log("New member created:", newMember);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          size="sm"
          className="rounded-full h-10 w-10 p-0 transition-all hover:scale-110 hover:shadow-lg bg-primary/90 hover:bg-primary"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Contributions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .filter((user) => user.communityId === communityId)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.contributions}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <CreateMemberDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onMemberCreated={handleMemberCreated}
        communityId={communityId}
      />
    </div>
  );
};

export default CommunityUsers;
