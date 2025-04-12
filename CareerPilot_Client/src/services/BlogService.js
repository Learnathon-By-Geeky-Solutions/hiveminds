import axios from "axios";

class BlogService {
  // Post a new blog post
  addNewPost(postData) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post("http://localhost:8082/api/posts", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Get all posts
  getAllPosts() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get("http://localhost:8082/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Get a specific post by ID
  getPostById(postId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(`http://localhost:8082/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Update a specific post by ID
  updatePost(postId, updatedData) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.put(`http://localhost:8082/api/posts/${postId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Delete a specific post by ID
  deletePost(postId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.delete(`http://localhost:8082/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Fetch posts by user ID
  getPostsByUserId(userId, page = 0, size = 20) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(`http://localhost:8082/api/posts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size,
      },
    });
  }
}

export default new BlogService();
