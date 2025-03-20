import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import BlogService from "@/services/BlogService";
import { Send, X } from "lucide-react";
import { useState } from "react";

const NewPostForm = () => {
  const { token } = useAuth();
  const [content, setContent] = useState(""); // Store content as a string

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }

    if (!content.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    BlogService.addNewPost({ content }) // Pass content as an object
      .then((response) => {
        console.log("Post created successfully:", response.data);
        setContent(""); // Clear the content after successful submission
        alert("Post created successfully!"); // Show success message
      })
      .catch((error) => {
        console.error("Error creating post!", error);
        let errorMessage = "An error occurred while creating the post.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message; // Extract error message from response
        }
        alert(errorMessage); // Show error message
      });
  };

  return (
    <Card className="w-full mb-8 bg-card/90 backdrop-blur-sm border border-primary/10 animate-fade-in">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Create a new post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>

            <div className="flex-grow space-y-3">
              {/* Textarea for post content */}
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Update content directly
                className="w-full h-36 p-3 bg-secondary/50 backdrop-blur-sm rounded-lg border border-primary/10 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>

        {/* Buttons for submitting or canceling */}
        <CardFooter className="flex justify-end space-x-2 pt-0">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setContent("")} // Clear content
            aria-label="Cancel post creation"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!content.trim()} // Disable if content is empty
            aria-label="Publish post"
          >
            <Send className="h-4 w-4 mr-1" />
            Publish
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewPostForm;
