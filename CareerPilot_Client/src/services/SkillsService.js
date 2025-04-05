import axios from "axios";

class SkillsService {
   
  // Create a new skill
  addSkill(skillData) {
    const token = localStorage.getItem("ACCESS_TOKEN"); 
    return axios.post("http://localhost:8082/api/skills", skillData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Fetch all skills
  getSkills(){
    const token = localStorage.getItem("ACCESS_TOKEN"); 
    return axios.get("http://localhost:8082/api/skills", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Fetch a skill by id
  getSkillById(id) {
    const token = localStorage.getItem("ACCESS_TOKEN"); 
    return axios.get(`http://localhost:8082/api/skills/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Update a skill byt id
  updateSkill(id, skillData) {
    const token = localStorage.getItem("ACCESS_TOKEN"); 
    return axios.put(`http://localhost:8082/api/skills/${id}`, skillData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Delete a skill by id
  deleteSkill(id) {
    const token = localStorage.getItem("ACCESS_TOKEN"); 
    return axios.delete(`http://localhost:8082/api/skills/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

}

export default new SkillsService();