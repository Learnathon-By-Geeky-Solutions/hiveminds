import { useState } from "react";
import BlogService from "@/services/BlogService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Loader2 } from "lucide-react";

const NewPostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState(""); // Post content
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const postData = { content }; // Add more fields (e.g., image, visibility) if needed
      const response = await BlogService.addNewPost(postData);
      onPostCreated(response.data); // Pass the new post to the parent component
      setContent(""); // Clear the form
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Share your thoughts, questions, or insights..."
          className="w-full p-4 bg-secondary/50 backdrop-blur-sm rounded-lg border border-primary/10 text-sm min-h-[8rem] resize-none focus:ring-primary/30"
        />
        <div className="absolute top-3 right-3">
          <PenLine className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="bg-gradient-blue hover:neon-glow transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Create Post"
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewPostForm;