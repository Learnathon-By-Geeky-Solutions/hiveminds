import BlogPost from "@/components/blog/BlogPost";
import NewPostForm from "@/components/blog/NewPostForm";
import { useAuth } from "@/contexts/AuthContext";
import BlogService from "@/services/BlogService";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 px-4 sm:px-6 animate-fade-in">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gradient">CareerPilot Community Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your career journey, ask questions, and connect with other professionals
          </p>
        </header>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
            <NewPostForm onPostCreated={(newPost) => setPosts([newPost, ...posts])} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => {
                if (!post.postId) {
                  console.error("Invalid post object:", post);
                  return null; // Skip invalid posts
                }
                return (
                  <div key={post.postId} className="md:col-span-2 lg:col-span-1 h-full">
                    <BlogPost post={post} />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full glass-card p-8 text-center rounded-xl">
                <p className="text-muted-foreground">No posts available. Be the first to share!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;