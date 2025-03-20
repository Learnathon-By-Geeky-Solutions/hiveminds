import BlogPost from "@/components/blog/BlogPost";
import NewPostForm from "@/components/blog/NewPostForm";
import { useAuth } from "@/contexts/AuthContext";
import BlogService from "@/services/BlogService";
import { useEffect, useState } from "react";

const Blog = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await BlogService.getAllPosts();
        setPosts(response.data); // Set fetched posts to state
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 text-gradient animate-fade-in">
            CareerPilot Community Blog
          </h1>

          <div className="space-y-8">
            {/* Form to create a new post */}
            <NewPostForm />

            {/* Render all posts */}
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))
            ) : (
              <div>No posts available.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;