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
import { useCommunity } from "@/contexts/CommunityContext";
import { useToast } from "@/hooks/use-toast";
import UserService from "@/services/UserService";
import { Loader2, UserCheck, UserPlusIcon, UserX } from "lucide-react";
import { useState } from "react";

const CreateMemberDialog = ({ open, onOpenChange, communityId }) => {
  const { toast } = useToast();
  const { sendJoinRequest } = useCommunity();

  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState("");

  const handleCheckUser = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setIsChecking(true);
    setError("");

    try {
      const response = await UserService.getUserProfileByUsername(username);
      setFoundUser(response.data);
    } catch (error) {
      console.error("Error checking username:", error);
      if (error.response?.status === 404) {
        setError("No user found with this username");
      } else {
        setError("Error checking username. Please try again.");
      }
      setFoundUser(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foundUser) {
      setError("Please find a valid user first");
      return;
    }

    setIsSubmitting(true);
    try {
      // Send join request with MEMBER role only (removing the role selection)
      await sendJoinRequest(foundUser.id, communityId);

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${foundUser.username}`,
      });

      // Reset form and close dialog
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error inviting user:", error);
      toast({
        variant: "destructive",
        title: "Failed to send invitation",
        description:
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setFoundUser(null);
    setError("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) resetForm();
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Invite Member</DialogTitle>
          <DialogDescription>
            Invite someone to join your community by username.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Username Input with Check Button */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex space-x-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isChecking || foundUser}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleCheckUser}
                disabled={isChecking || !username.trim() || foundUser}
              >
                {isChecking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Check"
                )}
              </Button>
            </div>

            {error && (
              <div className="flex items-center text-destructive text-sm mt-2">
                <UserX className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}

            {foundUser && (
              <div className="flex items-center text-primary text-sm mt-2">
                <UserCheck className="h-4 w-4 mr-1" />
                User found: {foundUser.firstName} {foundUser.lastName} (
                {foundUser.username})
              </div>
            )}
          </div>

          {/* Member Role Information - Only shown when user is found */}
          {foundUser && (
            <div className="border p-4 rounded-md bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <UserPlusIcon className="h-5 w-5 text-primary" />
                <Label className="font-medium">Member Role</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                The invited user will join as a regular member and can view
                content and participate in community discussions.
              </p>
            </div>
          )}

          {/* Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isChecking || isSubmitting}
            >
              Cancel
            </Button>
            {foundUser && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemberDialog;
