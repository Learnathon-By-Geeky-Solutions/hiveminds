import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreatePostDialog from "./CreatePostDialog";

const CommunityPosts = ({ posts, communityId }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handlePostCreated = (newPost) => {
    // TODO: Update posts list with the new post
    console.log("New post created:", newPost);
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
      {posts
        .filter((post) => post.communityId === communityId)
        .map((post) => (
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
                  {post.author} • {post.timestamp}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  {post.likes} likes
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      <CreatePostDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onPostCreated={handlePostCreated}
        communityId={communityId}
      />
    </div>
  );
};

export default CommunityPosts;
