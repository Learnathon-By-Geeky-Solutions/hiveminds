import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import CreateMemberDialog from "./CreateMemberDialog";

// Placeholder data for community members
const dummyMembers = [
  {
    id: 1,
    username: "Sarah Johnson",
    role: "ADMIN",
    dateJoined: "2025-03-15",
    contributions: 42,
  },
  {
    id: 2,
    username: "Alex Chen",
    role: "MODERATOR",
    dateJoined: "2025-03-18",
    contributions: 27,
  },
  {
    id: 3,
    username: "Michael Rodriguez",
    role: "MEMBER",
    dateJoined: "2025-04-02",
    contributions: 14,
  },
  {
    id: 4,
    username: "Emily Parker",
    role: "MEMBER",
    dateJoined: "2025-04-10",
    contributions: 8,
  },
];

const CommunityUsers = ({ communityId }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { token } = useAuth();

  // Using dummy members data instead of fetching from backend
  const members = dummyMembers;

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getRoleBadgeVariant = (role) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return {
          variant: "destructive",
          className: "bg-destructive/20 text-destructive",
        };
      case "MODERATOR":
        return { variant: "default", className: "bg-primary/20 text-primary" };
      default:
        return { variant: "outline", className: "bg-background/50" };
    }
  };

  return (
    <div className="space-y-6">
      {token && (
        <div className="flex justify-end">
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            size="sm"
            className="rounded-full flex items-center gap-2 px-4 transition-all hover:scale-105 hover:shadow-lg bg-primary/90 hover:bg-primary"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite Member</span>
          </Button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Contributions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => {
              const roleBadge = getRoleBadgeVariant(member.role);
              return (
                <TableRow key={member.id} className="hover:bg-accent/5">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(member.name || member.username)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name || member.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={roleBadge.variant}
                      className={roleBadge.className}
                    >
                      {member.role || "Member"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatJoinDate(member.joinDate || member.dateJoined)}
                  </TableCell>
                  <TableCell>{member.contributions || 0}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <CreateMemberDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onMemberCreated={() => {}}
        communityId={communityId}
      />
    </div>
  );
};

export default CommunityUsers;
