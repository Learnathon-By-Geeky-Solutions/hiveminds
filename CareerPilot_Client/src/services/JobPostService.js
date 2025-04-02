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
}

export default new JobPostService();