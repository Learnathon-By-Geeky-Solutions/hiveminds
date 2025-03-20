import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";


const CommentItem = ({ comment, postId, onAddReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false); // Toggle reply form visibility

  // Handle reply submission
  const handleReplySubmit = (reply) => {
    onAddReply(comment.id, reply); // Call the onAddReply function with the comment ID and reply content
    setShowReplyForm(false); // Hide the reply form after submission
  };

  // Format timestamp into a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="group relative">
      <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-primary/10 group-last:hidden"></div>
      <div className="pl-10 pb-2 relative">
        <div className="absolute left-0 top-2 h-8 w-8 rounded-full overflow-hidden border border-primary/10">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
            <AvatarFallback>{comment.author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute left-[32px] top-[14px] h-[1px] w-[8px] bg-primary/10"></div>

        <div className="bg-secondary/50 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="font-medium text-sm">{comment.author.username}</div>
            <div className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</div>
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

        {comment.comments.length > 0 && (
          <div className="mt-2 pl-2">
            <CommentList
              comments={comment.comments}
              postId={postId}
              parentCommentId={comment.id}
              onAddReply={onAddReply}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;