import axios from "axios";

class CompanyService {
    // Fetch current company profile
    getCurrentCompanyProfile() {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.get("http://localhost:8082/api/companies", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    }

    // Fetch the company profile by ID
    getCompanyProfileById(id) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.get(`http://localhost:8082/api/companies/creator/${id}/allcompanies`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    }

    // Create a new company
    createCompany(companyData) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.post("http://localhost:8082/api/companies", companyData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    }
}
export default new CompanyService();
