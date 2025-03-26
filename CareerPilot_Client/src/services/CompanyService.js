import axios from "axios";

class CompanyService {
    // Fetch current company profile
    getCurrentCompanyProfile() {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.get("http://localhost:8082/api/company", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    }
}
export default new CompanyService();
