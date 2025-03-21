import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CommentService from "@/services/CommentService";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageSquareReply,
} from "lucide-react";
import { useEffect, useState } from "react";
import NewCommentForm from "./NewCommentForm";
import TimeAgo from "./TimeAgo";

const CommentItem = ({ comment, postId, onAddReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false); // Toggle reply form visibility
  const [replies, setReplies] = useState([]); // State for nested replies
  const [loadingReplies, setLoadingReplies] = useState(false); // Loading state for replies
  const [liked, setLiked] = useState(false); // Like button state
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 10)); // Random like count
  const [collapsed, setCollapsed] = useState(false); // Collapsed state for replies

  // Fetch replies for the current comment
  useEffect(() => {
    const fetchReplies = async () => {
      setLoadingReplies(true);
      try {
        const response = await CommentService.getRepliesForComment(
          postId,
          comment.id
        );
        setReplies(response.data); // Set fetched replies to state
      } catch (error) {
        console.error("Error fetching replies:", error);
      } finally {
        setLoadingReplies(false);
      }
    };

    fetchReplies(); // Fetch replies when the component mounts
  }, [postId, comment.id]);

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

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Generate a random time for demo purposes
  const commentTime = formatDistanceToNow(
    new Date(Date.now() - Math.floor(Math.random() * 5000000000)),
    {
      addSuffix: true,
    }
  );

  const getInitials = (name) => {
    return (name || "AN").substring(0, 2).toUpperCase();
  };

  const hasReplies = replies && replies.length > 0;

  return (
    <div className="group">
      <div className="flex gap-2">
        <Avatar className="h-7 w-7 shrink-0 mt-0.5 border border-primary/20">
          <AvatarFallback className="bg-blue-300 text-primary-foreground text-xs">
            {getInitials(comment.username)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1.5">
          <div className="bg-secondary/50 backdrop-blur-sm p-2.5 rounded-lg rounded-tl-none">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-gradient">
                {comment.username || "Anonymous"}
              </span>
              {/* <span className="text-xs text-muted-foreground">
                {commentTime}
              </span> */}
              <TimeAgo className="text-xs text-muted-foreground" createdAt={comment.createdAt}/>
            </div>
            <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
          </div>

          <div className="flex items-center gap-3 pl-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 px-1.5 text-xs ${
                liked ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={handleLike}
            >
              <Heart
                className={`h-3 w-3 mr-1 ${liked ? "fill-primary" : ""}`}
              />
              {likeCount > 0 && likeCount}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1.5 text-xs text-muted-foreground"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageSquareReply className="h-3 w-3 mr-1" />
              Reply
            </Button>

            {hasReplies && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-xs text-muted-foreground"
                onClick={toggleCollapsed}
              >
                {collapsed ? (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show {replies.length}{" "}
                    {replies.length === 1 ? "reply" : "replies"}
                  </>
                ) : (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Hide replies
                  </>
                )}
              </Button>
            )}
          </div>

          {showReplyForm && (
            <div className="pl-1 pt-1">
              <NewCommentForm
                isReply={true}
                onCancel={() => setShowReplyForm(false)}
                onSubmit={handleReplySubmit}
              />
            </div>
          )}

          {hasReplies && !collapsed && (
            <div className="pl-4 pt-2 border-l border-gray-600 mt-2 space-y-3 transition-all duration-300 ease-in-out">
              {replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  onAddReply={onAddReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
