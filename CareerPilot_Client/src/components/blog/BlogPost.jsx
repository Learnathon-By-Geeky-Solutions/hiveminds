import CommentList from "./CommentList";
import CommentService from "@/services/CommentService";
import { useEffect, useState } from "react";
import NewCommentForm from "./NewCommentForm";

const BlogPost = ({ post }) => {
  const [comments, setComments] = useState([]); // State to store fetched comments
  const [loading, setLoading] = useState(true); // Loading state for comments

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
        const response = await CommentService.getFirstLayerCommentsByPostId(post.postId);
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
      const response = await CommentService.addNewComment(post.postId, newComment);
      setComments((prevComments) => [...prevComments, response.data]); // Add new comment to state
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
      const response = await CommentService.createReply(post.postId, parentId, newReply);

      // Update the parent comment with the new reply
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: [...(comment.replies || []), response.data] }
            : comment
        )
      );
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      {/* Post Content */}
      <p className="text-lg text-gray-800">Username: {post.username}</p>
      <p className="text-lg text-gray-800">Post: {post.content}</p>

      {/* Add Comment Form */}
      <NewCommentForm onSubmit={handleAddComment} />

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="font-medium">Comments</h3>
        {loading ? (
          <div>Loading comments...</div>
        ) : (
          <CommentList
            comments={comments}
            postId={post.postId}
            onAddReply={handleAddReply}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPost;