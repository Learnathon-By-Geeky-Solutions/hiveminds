// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8082/", // Replace with your API base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Axios Interceptor for handling 403 Forbidden errors
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Return successful responses as-is
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       // Handle 403 Forbidden error
//       console.error("Access forbidden. Logging out...");

//       // Clear the token and log the user out
//       localStorage.removeItem("ACCESS_TOKEN");

//       // Redirect to the login page
//       window.location.href = "/login"; // Force a full-page reload
//     }

//     // Pass other errors through
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;