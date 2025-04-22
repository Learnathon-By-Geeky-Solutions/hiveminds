import axios from "axios";

const API_BASE_URL = "http://localhost:8082/api";

class CommunityService {
  // Create a new community
  createCommunity(communityDTO, userId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post(
      `${API_BASE_URL}/community?userId=${userId}`,
      communityDTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Get all communities (paginated)
  getAllCommunities(page = 0, size = 10, sort = "name,asc") {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(
      `${API_BASE_URL}/community?page=${page}&size=${size}&sort=${sort}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Get communities created by a specific user
  getUserCommunities(userId, page = 0, size = 10) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(
      `${API_BASE_URL}/community/creator/${userId}?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Send request to join a community
  sendJoinRequest(userId, communityId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post(
      `${API_BASE_URL}/community/join-request?userId=${userId}&communityId=${communityId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Accept a join request
  acceptJoinRequest(requestId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post(
      `${API_BASE_URL}/community/accept/${requestId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Get community members
  getCommunityMembers(communityId, page = 0, size = 10) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(
      `${API_BASE_URL}/community/${communityId}/members?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Get community posts
  getCommunityPosts(communityId, page = 0, size = 10) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(
      `${API_BASE_URL}/community/${communityId}/posts?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Add a user as a moderator
  addModerator(userId, communityId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post(
      `${API_BASE_URL}/community/addMod/${userId}?communityId=${communityId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Add a user as an admin
  addAdmin(userId, communityId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post(
      `${API_BASE_URL}/community/addAdmin/${userId}?communityId=${communityId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Remove a user from community
  removeUser(userId, communityId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post(
      `${API_BASE_URL}/community/remove/${userId}?communityId=${communityId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Get pending join requests for user
  getUserRequests(page = 0, size = 4) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(
      `${API_BASE_URL}/community/getRequest?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Delete a community
  deleteCommunity(communityId) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.delete(`${API_BASE_URL}/community/${communityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new CommunityService();
