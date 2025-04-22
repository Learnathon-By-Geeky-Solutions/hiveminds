import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Plus, ThumbsUp } from "lucide-react";
import { useState } from "react";
import CreatePostDialog from "./CreatePostDialog";

// Placeholder data for community posts
const dummyPosts = [
  {
    id: 1,
    title: "Getting Started in Tech Careers",
    content:
      "Looking for advice on how to break into the tech industry as a fresh graduate? What skills should I prioritize learning?",
    author: {
      username: "TechNewbie",
    },
    createdAt: "2025-04-15T14:30:00",
    likes: 24,
    commentCount: 8,
  },
  {
    id: 2,
    title: "Remote Work Tips & Tricks",
    content:
      "After working remotely for 3 years, I've compiled my best practices for staying productive and maintaining work-life balance. What strategies work for you?",
    author: {
      username: "RemoteRanger",
    },
    createdAt: "2025-04-18T09:45:00",
    likes: 42,
    commentCount: 15,
  },
  {
    id: 3,
    title: "Salary Negotiation Success Stories",
    content:
      "I just successfully negotiated a 20% salary increase! Would love to hear others' experiences and tips for navigating these conversations effectively.",
    author: {
      username: "NegotiationPro",
    },
    createdAt: "2025-04-20T16:15:00",
    likes: 37,
    commentCount: 12,
  },
];

const CommunityPosts = ({ communityId }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { token } = useAuth();

  // Using dummy posts data instead of fetching from backend
  const posts = dummyPosts;

  return (
    <div className="space-y-6">
      {token && (
        <div className="flex justify-end">
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            size="sm"
            className="rounded-full flex items-center gap-2 px-4 transition-all hover:scale-105 hover:shadow-lg bg-primary/90 hover:bg-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Create Post</span>
          </Button>
        </div>
      )}

      {posts.map((post) => (
        <Card
          key={post.id}
          className="group hover:shadow-lg transition-all duration-300 hover:border-accent/50"
        >
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground/90 mt-3 text-base">
              {post.content}
            </p>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="text-muted-foreground/80 font-medium">
                {post.author?.username || "Anonymous"} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background/50 transition-colors"
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span>{post.likes || 0}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background/50 transition-colors"
                >
                  <MessageSquare className="h-3 w-3" />
                  <span>{post.commentCount || 0}</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <CreatePostDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onPostCreated={() => {}}
        communityId={communityId}
      />
    </div>
  );
};

export default CommunityPosts;
