import CommunityService from "@/services/CommunityService";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./UserContext";

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinRequests, setJoinRequests] = useState([]);
  const { user } = useUser();

  // Fetch all communities - memoized with useCallback to prevent infinite loops
  const fetchCommunities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CommunityService.getAllCommunities();
      setCommunities(response.data.content || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching communities:", err);
      setError("Failed to load communities");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since this shouldn't depend on any values that change

  // Create a new community
  const createCommunity = async (communityData) => {
    try {
      if (!user || !user.id) {
        throw new Error("User must be authenticated to create a community");
      }

      // Format the community data according to the expected DTO structure
      const communityDTO = {
        name: communityData.name,
        description: communityData.description,
        category: communityData.category,
        visibility: communityData.visibility || "PUBLIC",
      };

      // Send the request with userId as a parameter
      const response = await CommunityService.createCommunity(
        communityDTO,
        user.id
      );

      // Add the new community to the state
      setCommunities((prevCommunities) => [response.data, ...prevCommunities]);

      return response.data;
    } catch (err) {
      console.error("Error creating community:", err);
      throw err;
    }
  };

  // Load communities when the component mounts
  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]); // Add fetchCommunities as a dependency

  // Get communities created by the current user
  const fetchUserCommunities = useCallback(async () => {
    if (!user || !user.id) return [];

    try {
      setLoading(true);
      const response = await CommunityService.getUserCommunities(user.id);
      return response.data.content || [];
    } catch (err) {
      console.error("Error fetching user communities:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]); // Add user as a dependency

  // Send join request to a community with role
  const sendJoinRequest = async (userId, communityId) => {
    if (!user || !user.id) {
      throw new Error("User must be authenticated to send join requests");
    }

    try {
      // Always use MEMBER role for community join requests
      await CommunityService.sendJoinRequest(userId, communityId, "MEMBER");
      return true;
    } catch (err) {
      console.error("Error sending join request:", err);
      throw err;
    }
  };

  // Fetch pending join requests for the current user
  const fetchJoinRequests = useCallback(
    async (page = 0, size = 10) => {
      if (!user || !user.id) {
        return { content: [], empty: true };
      }

      try {
        setLoading(true);
        const response = await CommunityService.getUserRequests(page, size);
        const requests = response.data.content || [];
        setJoinRequests(requests);
        return requests;
      } catch (err) {
        console.error("Error fetching join requests:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // Accept a join request
  const acceptJoinRequest = async (requestId) => {
    try {
      await CommunityService.acceptJoinRequest(requestId);
      // Update the local join requests state
      setJoinRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
      return true;
    } catch (err) {
      console.error("Error accepting join request:", err);
      throw err;
    }
  };

  // Reject/delete a join request
  const rejectJoinRequest = async (requestId) => {
    try {
      await CommunityService.rejectJoinRequest(requestId);
      // Update the local join requests state
      setJoinRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
      return true;
    } catch (err) {
      console.error("Error rejecting join request:", err);
      throw err;
    }
  };

  // Get community members
  const getCommunityMembers = useCallback(
    async (communityId, page = 0, size = 10) => {
      if (!communityId) return { content: [], empty: true };

      try {
        const response = await CommunityService.getCommunityMembers(
          communityId,
          page,
          size
        );
        return response.data || { content: [], empty: true };
      } catch (err) {
        console.error("Error fetching community members:", err);
        throw err;
      }
    },
    []
  );

  // Get community posts
  const getCommunityPosts = useCallback(
    async (communityId, page = 0, size = 10) => {
      if (!communityId) return { content: [], empty: true };

      try {
        const response = await CommunityService.getCommunityPosts(
          communityId,
          page,
          size
        );
        return response.data || { content: [], empty: true };
      } catch (err) {
        console.error("Error fetching community posts:", err);
        throw err;
      }
    },
    []
  );

  return (
    <CommunityContext.Provider
      value={{
        communities,
        loading,
        error,
        joinRequests,
        fetchCommunities,
        createCommunity,
        fetchUserCommunities,
        sendJoinRequest,
        fetchJoinRequests,
        acceptJoinRequest,
        rejectJoinRequest,
        getCommunityMembers,
        getCommunityPosts,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);
