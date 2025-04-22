import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCommunity } from "@/contexts/CommunityContext";
import { useToast } from "@/hooks/use-toast";
import { Bell, Check, Loader2, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

const CommunityInvitesSection = () => {
  const {
    joinRequests,
    fetchJoinRequests,
    acceptJoinRequest,
    rejectJoinRequest,
  } = useCommunity();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState([]);
  const [hasCheckedForInvites, setHasCheckedForInvites] = useState(false);

  const loadRequests = async () => {
    try {
      setLoading(true);
      await fetchJoinRequests();
    } catch (error) {
      console.error("Error fetching join requests:", error);
      toast({
        variant: "destructive",
        title: "Failed to load community invites",
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
      setHasCheckedForInvites(true);
    }
  };

  // Fetch invitations when component mounts or when the route changes
  useEffect(() => {
    loadRequests();

    // Set up a refresh interval (every 30 seconds)
    const intervalId = setInterval(() => {
      loadRequests();
    }, 30000);

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [fetchJoinRequests, toast]);

  const handleRefresh = () => {
    loadRequests();
  };

  const handleAccept = async (requestId) => {
    setProcessingIds((prev) => [...prev, requestId]);
    try {
      await acceptJoinRequest(requestId);
      toast({
        title: "Invitation accepted",
        description: "You've successfully joined the community",
      });
    } catch (error) {
      console.error("Error accepting invitation:", error);
      toast({
        variant: "destructive",
        title: "Failed to accept invitation",
        description: "Please try again later",
      });
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== requestId));
    }
  };

  const handleReject = async (requestId) => {
    setProcessingIds((prev) => [...prev, requestId]);
    try {
      await rejectJoinRequest(requestId);
      toast({
        title: "Invitation rejected",
        description: "The invitation has been declined",
      });
    } catch (error) {
      console.error("Error rejecting invitation:", error);
      toast({
        variant: "destructive",
        title: "Failed to reject invitation",
        description: "Please try again later",
      });
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== requestId));
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "bg-destructive/20 text-destructive border-destructive/20";
      case "MODERATOR":
        return "bg-primary/20 text-primary border-primary/20";
      default:
        return "bg-secondary/50 text-secondary-foreground border-secondary/20";
    }
  };

  // Always show a minimal card if we've checked for invites and there are none
  if (!loading && hasCheckedForInvites && joinRequests.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Community Invitations</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="h-8 w-8 p-0"
            >
              <RefreshCcw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
          <CardDescription>
            You have no pending community invitations
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Community Invitations</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-background">
              {joinRequests.length} pending
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="h-8 w-8 p-0"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>
        <CardDescription>
          Review and respond to your community invitations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {joinRequests.map((request) => (
              <div key={request.id} className="rounded-lg border p-4">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 border">
                      {request.community?.image ? (
                        <AvatarImage
                          src={request.community.image}
                          alt={request.community.name}
                        />
                      ) : (
                        <AvatarFallback className="text-lg">
                          {request.community?.name?.charAt(0) || "C"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h4 className="text-base font-semibold">
                        {request.community?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                        {request.community?.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge
                          variant="outline"
                          className={getRoleBadgeColor(request.role)}
                        >
                          {request.role || "Member"}
                        </Badge>
                        <Badge variant="outline" className="bg-background/80">
                          {request.community?.memberCount || 0} members
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto self-end">
                    <Button
                      onClick={() => handleReject(request.id)}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      disabled={processingIds.includes(request.id)}
                    >
                      {processingIds.includes(request.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <X className="mr-1 h-4 w-4" />
                          Decline
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleAccept(request.id)}
                      variant="default"
                      size="sm"
                      className="w-full sm:w-auto"
                      disabled={processingIds.includes(request.id)}
                    >
                      {processingIds.includes(request.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Check className="mr-1 h-4 w-4" />
                          Accept
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityInvitesSection;
