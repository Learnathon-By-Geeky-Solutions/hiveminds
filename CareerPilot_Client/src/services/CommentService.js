import axios from "axios";

class CommentService {
  // Get top-level comments for a post
  getFirstLayerCommentsByPostId(postId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!postId) {
      throw new Error("Invalid postId");
    }
    return axios.get(`http://localhost:8082/api/posts/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Add a new comment to a post
  addNewComment(postId, commentData) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!postId) {
      throw new Error("Invalid postId");
    }
    return axios.post(`http://localhost:8082/api/posts/${postId}/comments`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Add a reply to a comment
  createReply(postId, parentId, replyData) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!postId || !parentId) {
      throw new Error("Invalid postId or parentId");
    }
    return axios.post(
      `http://localhost:8082/api/posts/${postId}/comments`,
      { ...replyData, parentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Get replies for a specific comment
  getRepliesForComment(postId, commentId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!postId || !commentId) {
      throw new Error("Invalid postId or commentId");
    }
    return axios.get(`http://localhost:8082/api/posts/${postId}/comments/${commentId}/replies`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new CommentService();