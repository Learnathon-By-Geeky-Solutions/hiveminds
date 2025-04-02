import axios from "axios";

const API_URL = "http://localhost:8082/api/skills"; // Update with your actual API URL

const SkillsService = {

    // Post a skill
    addSkill(skillName){
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.post(API_URL, skillName, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    }
    
};

export default SkillsService;