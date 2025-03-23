import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, postId, onAddReply }) => {
  return (
    <div className="space-y-3 pl-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id} // Ensure unique key
          comment={comment}
          postId={postId}
          onAddReply={onAddReply}
        />
      ))}
    </div>
  );
};

export default CommentList;