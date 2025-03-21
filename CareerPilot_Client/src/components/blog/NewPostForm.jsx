import { useState } from "react";
import BlogService from "@/services/BlogService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your blog post here..."
        className="w-full p-2 bg-secondary/50 backdrop-blur-sm rounded-lg border border-primary/10 text-sm min-h-[5rem]"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Posting..." : "Create Post"}
      </Button>
    </form>
  );
};

export default NewPostForm;