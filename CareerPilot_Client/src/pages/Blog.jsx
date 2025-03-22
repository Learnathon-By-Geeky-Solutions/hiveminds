import BlogPost from "@/components/blog/BlogPost";
import NewPostForm from "@/components/blog/NewPostForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import BlogService from "@/services/BlogService";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Blog = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [loading, setLoading] = useState(true); // Loading state
  const [visibleCount, setVisibleCount] = useState(10); // Number of posts to display

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

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, posts.length)); // Increase visible posts by 5
  };

  const showLess = () => {
    setVisibleCount((prev) => Math.max(prev - 5, 10)); // Decrease visible posts by 5, but not below 10
  };

  // Get only the posts we want to display
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 px-4 sm:px-6 animate-fade-in">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gradient">
            CareerPilot Community Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your career journey, ask questions, and connect with other
            professionals
          </p>
        </header>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
            <NewPostForm
              onPostCreated={(newPost) => setPosts([newPost, ...posts])}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visiblePosts.length > 0 ? (
                visiblePosts.map((post) => {
                  if (!post.postId) {
                    console.error("Invalid post object:", post);
                    return null; // Skip invalid posts
                  }
                  return (
                    <div
                      key={post.postId}
                      className="md:col-span-2 lg:col-span-1 h-full"
                    >
                      <BlogPost post={post} />
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full glass-card p-8 text-center rounded-xl">
                  <p className="text-muted-foreground">
                    No posts available. Be the first to share!
                  </p>
                </div>
              )}
            </div>

            {/* Show More/Less Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              {visibleCount > 10 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={showLess}
                  className="flex items-center gap-1"
                >
                  Show Less
                </Button>
              )}

              {visibleCount < posts.length && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={showMore}
                  className="flex items-center gap-1"
                >
                  Show More
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
