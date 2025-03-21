import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CommentService from "@/services/CommentService";
import { Reply } from "lucide-react";
import { useState } from "react";
import NewCommentForm from "./NewCommentForm";

const CommentItem = ({ comment, postId, onAddReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false); // Toggle reply form visibility
  const [replies, setReplies] = useState(comment.comments || []); // State for nested replies

  const handleReplySubmit = async (replyContent) => {
    try {
      if (!postId) {
        console.error("Cannot add reply: Invalid postId");
        return;
      }
      const newReply = { content: replyContent };
      const response = await CommentService.createReply(
        postId,
        comment.id,
        newReply
      );
      setReplies((prevReplies) => [...prevReplies, response.data]); // Add new reply to state
      onAddReply(comment.id, response.data); // Notify parent component
      setShowReplyForm(false); // Hide reply form
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="group relative">
      <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-primary/10 group-last:hidden"></div>
      <div className="pl-10 pb-2 relative">
        <div className="absolute left-0 top-2 h-8 w-8 rounded-full overflow-hidden border border-primary/10">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {comment.author?.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute left-[32px] top-[14px] h-[1px] w-[8px] bg-primary/10"></div>

        <div className="bg-secondary/50 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="font-medium text-sm">
              {comment.author?.username || "Anonymous"}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(comment.createdAt)}
            </div>
          </div>
          <div className="text-sm mt-1">{comment.content}</div>
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-muted-foreground hover:text-primary"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>
        </div>

        {showReplyForm && (
          <div className="mt-2 ml-2">
            <NewCommentForm onSubmit={handleReplySubmit} isReply />
          </div>
        )}

        {replies.length > 0 && (
          <div className="mt-2 pl-2">
            <CommentList
              comments={replies}
              postId={postId}
              onAddReply={onAddReply}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
