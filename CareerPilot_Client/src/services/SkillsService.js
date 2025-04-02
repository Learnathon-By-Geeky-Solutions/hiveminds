import axios from "axios";

const API_URL = "http://localhost:8082/api/skills"; // Update with your actual API URL

class SkillsService {
  // Post a skill
  static addSkill(skillName) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.post(
      API_URL,
      skillName , 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Get all skills
  static getSkills() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Delete a skill by ID
  static deleteSkill(id) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

   // Update a skill by id
   static updateSkill(id, skillData) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return axios.put(`${API_URL}/${id}`, skillData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  
}

export default SkillsService;