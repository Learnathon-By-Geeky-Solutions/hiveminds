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
import { useUser } from "@/contexts/UserContext";
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
  const { user } = useUser(); // Get user from UserContext
  const { toast } = useToast();
  const currentUserId = user?.id;

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
      console.log("Fetched members:", response.data);
      // Add detailed debugging of the data structure
      if (response.data.content) {
        console.log("First member data:", response.data.content[0]);
      }
      setMembers(response.data.content || []);
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

  // Add logging to debug user information
  useEffect(() => {
    console.log("Current user ID:", currentUserId);
    console.log("All members:", members);
  }, [currentUserId, members]);

  // Log user data for debugging
  useEffect(() => {
    console.log("Current user data:", user);
  }, [user]);

  const handleMakeModerator = async (userId) => {
    console.log("Making user moderator:", userId, communityId);
    try {
      // Add loading state for this specific user
      setMembers((prev) =>
        prev.map((member) =>
          member.userId === userId ? { ...member, isLoading: true } : member
        )
      );

      await CommunityService.addModerator(userId, communityId);
      toast({
        title: "Success",
        description: "User has been made a moderator",
      });
      fetchMembers();
    } catch (error) {
      console.error(
        "Error updating role:",
        error.response?.data || error.message
      );
      toast({
        variant: "destructive",
        title: "Action failed",
        description:
          error.response?.data?.message ||
          "Could not update user role. Please try again.",
      });
      // Reset loading state
      setMembers((prev) =>
        prev.map((member) =>
          member.userId === userId ? { ...member, isLoading: false } : member
        )
      );
    }
  };

  const handleMakeAdmin = async (userId) => {
    console.log("Making user admin:", userId, communityId);
    try {
      // Add loading state for this specific user
      setMembers((prev) =>
        prev.map((member) =>
          member.userId === userId ? { ...member, isLoading: true } : member
        )
      );

      await CommunityService.addAdmin(userId, communityId);
      toast({
        title: "Success",
        description: "User has been made an admin",
      });
      fetchMembers();
    } catch (error) {
      console.error(
        "Error updating role:",
        error.response?.data || error.message
      );
      toast({
        variant: "destructive",
        title: "Action failed",
        description:
          error.response?.data?.message ||
          "Could not update user role. Please try again.",
      });
      // Reset loading state
      setMembers((prev) =>
        prev.map((member) =>
          member.userId === userId ? { ...member, isLoading: false } : member
        )
      );
    }
  };

  const handleRemoveUser = async (userId) => {
    console.log("Removing user:", userId, communityId);
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        // Add loading state for this specific user
        setMembers((prev) =>
          prev.map((member) =>
            member.userId === userId ? { ...member, isLoading: true } : member
          )
        );

        await CommunityService.removeUser(userId, communityId);
        toast({
          title: "Success",
          description: "User has been removed from the community",
        });
        fetchMembers();
      } catch (error) {
        console.error(
          "Error removing user:",
          error.response?.data || error.message
        );
        toast({
          variant: "destructive",
          title: "Action failed",
          description:
            error.response?.data?.message ||
            "Could not remove user. Please try again.",
        });
        // Reset loading state
        setMembers((prev) =>
          prev.map((member) =>
            member.userId === userId ? { ...member, isLoading: false } : member
          )
        );
      }
    }
  };

  // Find the current user's role in this community
  const getCurrentUserRole = () => {
    if (!user?.id || !members.length) return null;
    const currentUserMember = members.find(
      (member) => String(member.userId) === String(user.id)
    );
    return currentUserMember?.role || null;
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
              <TableHead>CommunityName</TableHead>
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
                    <TableCell>{member.communityName || "Unknown"}</TableCell>
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
                        {member.status || "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {getCurrentUserRole() === "MEMBER" ? (
                          <span className="text-muted-foreground text-sm">
                            You are a member
                          </span>
                        ) : getCurrentUserRole() === "ADMIN" ||
                          getCurrentUserRole() === "MODERATOR" ? (
                          <>
                            {/* Only show admin button if current user is admin and target is not already admin */}
                            {getCurrentUserRole() === "ADMIN" &&
                              member.role !== "ADMIN" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  title="Make Admin"
                                  disabled={member.isLoading}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (member.userId && communityId) {
                                      handleMakeAdmin(member.userId);
                                    } else {
                                      console.error(
                                        "Missing userId or communityId",
                                        {
                                          userId: member.userId,
                                          communityId,
                                        }
                                      );
                                      toast({
                                        variant: "destructive",
                                        title: "Action failed",
                                        description:
                                          "Missing required information for this action",
                                      });
                                    }
                                  }}
                                >
                                  {member.isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <ShieldAlert className="h-4 w-4" />
                                  )}
                                </Button>
                              )}

                            {/* Only show moderator button if current user is admin and target is not already mod or admin */}
                            {getCurrentUserRole() === "ADMIN" &&
                              member.role !== "MODERATOR" &&
                              member.role !== "ADMIN" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  title="Make Moderator"
                                  disabled={member.isLoading}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (member.userId && communityId) {
                                      handleMakeModerator(member.userId);
                                    } else {
                                      console.error(
                                        "Missing userId or communityId",
                                        { userId: member.userId, communityId }
                                      );
                                      toast({
                                        variant: "destructive",
                                        title: "Action failed",
                                        description:
                                          "Missing required information for this action",
                                      });
                                    }
                                  }}
                                >
                                  {member.isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <ShieldCheck className="h-4 w-4" />
                                  )}
                                </Button>
                              )}

                            {/* Remove button - don't show for admin removing themselves */}
                            {!(
                              member.role === "ADMIN" &&
                              String(member.userId) === String(user?.id)
                            ) && (
                              <Button
                                variant="destructive"
                                size="sm"
                                title="Remove from community"
                                disabled={member.isLoading}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (member.userId && communityId) {
                                    handleRemoveUser(member.userId);
                                  } else {
                                    console.error(
                                      "Missing userId or communityId",
                                      {
                                        userId: member.userId,
                                        communityId,
                                      }
                                    );
                                    toast({
                                      variant: "destructive",
                                      title: "Action failed",
                                      description:
                                        "Missing required information for this action",
                                    });
                                  }
                                }}
                              >
                                {member.isLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <UserX className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Loading permissions...
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
                  colSpan={5}
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
