import axios from "axios";

class JobPostService {
    // Post a new job post
    addNewJobPost(postJobData, companyId) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.post(`http://localhost:8082/api/companies/${companyId}/job-posts`, postJobData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    }

    // Get all job posts for a company
    getAllJobPosts(companyId) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.get(`http://localhost:8082/api/companies/${companyId}/job-posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }

    // Update a job using its ID
    updateJobPost(companyId, postId, postJobData) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.put(`http://localhost:8082/api/companies/${companyId}/job-posts/${postId}`, postJobData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    }

    // Delete a job using its ID
    deleteJobPost(companyId, postId) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.delete(`http://localhost:8082/api/companies/${companyId}/job-posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
}

export default new JobPostService();