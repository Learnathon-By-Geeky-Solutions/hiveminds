import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8082/";

class AuthService {
  // Register a new user
  registerUser(user) {
    return axios.post(USER_API_BASE_URL + "register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // Login a user
  loginUser(user) {
    return axios.post(USER_API_BASE_URL + "login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // Logout a user
  logout() {
    localStorage.removeItem("token");
    return axios.post(USER_API_BASE_URL + "logout");
  }
}

export default new AuthService();
