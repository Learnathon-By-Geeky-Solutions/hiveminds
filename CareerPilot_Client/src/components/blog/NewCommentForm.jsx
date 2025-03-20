import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { useState } from "react";

const NewCommentForm = ({ isReply = false, onCancel }) => {
  const [content, setContent] = useState(""); // State for the comment/reply content

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (content.trim()) {
      console.log("Submitted:", content); // Replace with actual submission logic
      setContent(""); // Reset the form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      {!isReply && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
      )}
      <div className="relative flex-grow">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isReply ? "Write a reply..." : "Write a comment..."}
          className="w-full p-2 pr-10 bg-secondary/50 backdrop-blur-sm rounded-lg border border-primary/10 text-sm min-h-[2.5rem] resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          rows={content.split("\n").length > 1 ? 3 : 1}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isReply && onCancel && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onCancel}
              className="text-muted-foreground h-7 w-7 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            className="text-primary h-7 w-7 p-0"
            disabled={!content.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewCommentForm;
