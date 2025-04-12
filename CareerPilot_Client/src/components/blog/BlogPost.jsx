import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CommentService from "@/services/CommentService";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Loader2,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";
import TimeAgo from "./TimeAgo";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

const BlogPost = ({ post }) => {
  const [comments, setComments] = useState([]); // State to store fetched comments
  const [loading, setLoading] = useState(true); // Loading state for comments
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50));
  const [liked, setLiked] = useState(false);
  const [commentsCollapsed, setCommentsCollapsed] = useState(true);
  const {token} = useAuth();
  const {user} = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        if (!post.postId) {
          console.error("Invalid postId:", post.postId);
          setLoading(false);
          return;
        }
        console.log("Fetching comments for postId:", post.postId); // Debugging log
        const response = await CommentService.getFirstLayerCommentsByPostId(
          post.postId
        );
        setComments(response.data); // Set fetched comments to state
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments(); // Fetch comments when the component mounts
  }, [post.postId]); // Re-fetch comments if postId changes

  const handleAddComment = async (content) => {
    try {
      if (!post.postId) {
        console.error("Cannot add comment: Invalid postId");
        return;
      }
      const newComment = { content };
      const response = await CommentService.addNewComment(
        post.postId,
        newComment
      );
      setComments((prevComments) => [...prevComments, response.data]); // Add new comment to state
      setShowCommentForm(false);
      setCommentsCollapsed(false); // Expand comments when a new one is added
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddReply = async (parentId, replyContent) => {
    try {
      if (!post.postId) {
        console.error("Cannot add reply: Invalid postId");
        return;
      }
      const newReply = { content: replyContent };
      const response = await CommentService.createReply(
        post.postId,
        parentId,
        newReply
      );

      // Update the parent comment with the new reply
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), response.data],
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const toggleComments = () => {
    setCommentsCollapsed(!commentsCollapsed);
  };

  const getInitials = (name) => {
    return name.substring(0, 2).toUpperCase();
  };

  const isAuthor = token && user.username === post.username;

  return (
    <Card
      className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 h-full overflow-hidden flex flex-col ${
        isAuthor ? "border-2 border-cyan-900 shadow-cyan-700 shadow-md" : ""
      }`}
    >
      <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-3">
        <Avatar className="h-10 w-10 border border-primary/20">
          <AvatarFallback className="bg-white text-primary-foreground">
            {getInitials(post.username || "User")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-bold text-xl text-gradient">{post.username || "Anonymous"}</div>
          <TimeAgo className="text-xs text-muted-foreground" createdAt={post.createdAt}/>
        </div>
      </CardHeader>

      <CardContent className="py-4 flex-grow">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
      </CardContent>

      <CardFooter className="flex flex-col pt-0 pb-4 px-4 gap-4 border-t border-border/30">
        <div className="flex items-center justify-between w-full pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${
                liked ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 mr-1 ${liked ? "fill-primary" : ""}`}
              />
              {likeCount}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="px-2 text-muted-foreground"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {comments.length}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {comments.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="px-2 text-muted-foreground"
                onClick={toggleComments}
              >
                {commentsCollapsed ? (
                  <>
                    <ChevronDown className="h-8 w-8 mr-1 text-blue-500" />
                    Show comments
                  </>
                ) : (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide comments
                  </>
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="px-2 text-muted-foreground"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {showCommentForm && (
          <div className="w-full">
            <NewCommentForm onSubmit={handleAddComment} />
          </div>
        )}

        {comments.length > 0 && !commentsCollapsed && (
          <div className="w-full transition-all duration-300 ease-in-out">
            {loading ? (
              <div className="flex justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <CommentList
                comments={comments}
                postId={post.postId}
                onAddReply={handleAddReply}
              />
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogPost;
