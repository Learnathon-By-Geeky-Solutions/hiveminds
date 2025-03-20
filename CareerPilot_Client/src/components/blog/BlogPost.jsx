import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

const BlogPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0); // Initialize with likes from the post

  // Handle like button click
  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1); // Increment likes
  };

  // Format timestamp into a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full mb-6 bg-card/90 backdrop-blur-sm hover:shadow-md transition-all duration-200 animate-fade-in overflow-hidden border border-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-9 w-9">
            {/* Use fallback since avatar image is not required for now */}
            <AvatarFallback>{post.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{post.username}</div>
            <div className="text-xs text-muted-foreground">
              {formatDate(post.timestamp)}
            </div>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold leading-tight">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm leading-relaxed text-foreground/90">
          {post.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 pb-4 border-t border-primary/5">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary flex items-center gap-1 px-2"
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likes > 0 ? likes : ""}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogPost;