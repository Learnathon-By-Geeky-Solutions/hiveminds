import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, postId, onAddReply, parentCommentId }) => {
  // Calculate indentation class based on parentCommentId
  const getIndentationClass = (parentCommentId) => {
    // Example logic: Add "pl-8" for each level of nesting
    return parentCommentId ? "pl-8" : "";
  };

  return (
    <div className={`space-y-4 ${getIndentationClass(parentCommentId)}`}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onAddReply={onAddReply}
        />
      ))}
    </div>
  );
};

export default CommentList;