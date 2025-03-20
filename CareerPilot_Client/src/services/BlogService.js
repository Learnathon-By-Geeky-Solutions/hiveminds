import axios from "axios";

class BlogService{

    // Post a blog (public endpoint)
    addNewPost(content) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.post("http://localhost:8082/api/posts", content, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    }

    // Get all posts (public endpoint)
    getAllPosts() {
        const token = localStorage.getItem("ACCESS_TOKEN");
        return axios.get("http://localhost:8082/api/posts", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }); 
    }
}

export default new BlogService();