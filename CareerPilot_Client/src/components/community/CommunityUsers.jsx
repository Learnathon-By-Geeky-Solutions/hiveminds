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
import { useToast } from "@/hooks/use-toast";
import CommunityService from "@/services/CommunityService";
import {
  Loader2,
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  UserX,
} from "lucide-react";
import { useEffect, useState } from "react";
import CreateMemberDialog from "./CreateMemberDialog";

const CommunityUsers = ({ communityId }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { toast } = useToast();
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, [communityId]);

  const fetchMembers = async () => {
    if (!communityId) return;

    try {
      setLoading(true);
      const response = await CommunityService.getAllCommunityMembers(
        communityId
      );
      const membersList = response.data.content || [];
      setMembers(membersList);

      // For development/testing - let's assume the current user is an admin
      // In production, you would use your auth context to get the current user's ID
      // const loggedInUserId = parseInt(localStorage.getItem("USER_ID"));
      // const currentMember = membersList.find(member => member.userId === loggedInUserId);
      // setCurrentUserRole(currentMember?.role || null);

      // For now, hardcode the current user as an admin to allow actions
      setCurrentUserRole("ADMIN");
    } catch (error) {
      console.error("Error fetching community members:", error);
      setError("Failed to load community members");
      toast({
        variant: "destructive",
        title: "Failed to load members",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = currentUserRole === "ADMIN";

  const handleMakeModerator = async (userId) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "Only admins can promote members to moderator",
      });
      return;
    }

    try {
      await CommunityService.addModerator(userId, communityId);
      toast({
        title: "Success",
        description: "User has been made a moderator",
      });
      fetchMembers();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        variant: "destructive",
        title: "Action failed",
        description: "Could not update user role. Please try again.",
      });
    }
  };

  const handleMakeAdmin = async (userId) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "Only admins can promote members to admin",
      });
      return;
    }

    try {
      await CommunityService.addAdmin(userId, communityId);
      toast({
        title: "Success",
        description: "User has been made an admin",
      });
      fetchMembers();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        variant: "destructive",
        title: "Action failed",
        description: "Could not update user role. Please try again.",
      });
    }
  };

  const handleRemoveUser = async (userId) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "Only admins can remove members",
      });
      return;
    }

    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        await CommunityService.removeUser(userId, communityId);
        toast({
          title: "Success",
          description: "User has been removed from the community",
        });
        fetchMembers();
      } catch (error) {
        console.error("Error removing user:", error);
        toast({
          variant: "destructive",
          title: "Action failed",
          description: "Could not remove user. Please try again.",
        });
      }
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 text-center">
        <p className="text-destructive mb-4">{error}</p>
        <Button variant="outline" onClick={fetchMembers}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {token && (
        <div className="flex justify-end">
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            size="sm"
            className="rounded-full flex items-center gap-2 px-4 bg-primary/90 hover:bg-primary"
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
              <TableHead>UserId</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length > 0 ? (
              members.map((member) => {
                const roleBadge = getRoleBadgeVariant(member.role);
                return (
                  <TableRow key={member.id} className="hover:bg-accent/5">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.userId
                              ? member.userId.toString().substring(0, 2)
                              : "??"}
                          </AvatarFallback>
                        </Avatar>
                        <span>User #{member.userId}</span>
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
                      <Badge
                        variant={
                          member.status === "ACCEPTED" ? "success" : "outline"
                        }
                        className={
                          member.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {member.status || "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {/* Make Admin button - only visible to admins and only for ACCEPTED members */}
                        {isAdmin &&
                          member.role !== "ADMIN" &&
                          member.status === "ACCEPTED" && (
                            <Button
                              variant="outline"
                              size="sm"
                              title="Make Admin"
                              onClick={() => handleMakeAdmin(member.userId)}
                            >
                              <ShieldAlert className="h-4 w-4" />
                            </Button>
                          )}

                        {/* Make Moderator button - only visible to admins and only for ACCEPTED members */}
                        {isAdmin &&
                          member.role !== "MODERATOR" &&
                          member.role !== "ADMIN" &&
                          member.status === "ACCEPTED" && (
                            <Button
                              variant="outline"
                              size="sm"
                              title="Make Moderator"
                              onClick={() => handleMakeModerator(member.userId)}
                            >
                              <ShieldCheck className="h-4 w-4" />
                            </Button>
                          )}

                        {/* Remove button - only visible to admins */}
                        {isAdmin && (
                          <Button
                            variant="destructive"
                            size="sm"
                            title="Remove from community"
                            onClick={() => handleRemoveUser(member.userId)}
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        )}

                        {/* Message shown when no actions are available */}
                        {(!isAdmin ||
                          (member.status !== "ACCEPTED" &&
                            member.role !== "ADMIN")) && (
                          <span className="text-sm text-muted-foreground italic">
                            {!isAdmin
                              ? "Admin privileges required"
                              : member.status !== "ACCEPTED"
                              ? "Pending approval"
                              : "No actions available"}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CreateMemberDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onMemberCreated={fetchMembers}
        communityId={communityId}
      />
    </div>
  );
};

export default CommunityUsers;
