import axios from "axios";

class UserService {
  // Fetch the current user's profile (protected endpoint)
  getCurrentUserProfile() {
    const token = localStorage.getItem("ACCESS_TOKEN"); // Retrieve the token from localStorage
    return axios.get("http://localhost:8082/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Manually add the Bearer token
        "Content-Type": "application/json",
      },
    });
  }

  // Update the current user's profile (protected endpoint)
  updateCurrentUserProfile(updatedData) {
    const token = localStorage.getItem("ACCESS_TOKEN"); // Retrieve the token from localStorage
    return axios.put("http://localhost:8082/api/users/profile", updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Manually add the Bearer token
        "Content-Type": "application/json",
      },
    });
  }

  // Fetch a user's profile by username (protected endpoint)
  getUserProfileByUsername(username) {
    const token = localStorage.getItem("ACCESS_TOKEN"); // Retrieve the token from localStorage
    return axios.get(`http://localhost:8082/api/users/profile/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Manually add the Bearer token
        "Content-Type": "application/json",
      },
    });
  }

  // Fetch all users (for member suggestions)
  getAllUsers(page = 0, size = 20) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get("http://localhost:8082/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page,
        size,
      },
    });
  }

  // Search users by username or name (partial match)
  searchUsers(query, page = 0, size = 10) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(`http://localhost:8082/api/users/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        query,
        page,
        size,
      },
    });
  }
}

export default new UserService();
