import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/UserContext";
import BlogService from "@/services/BlogService";
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import TimeAgo from "../blog/TimeAgo";

const UserBlogPosts = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Number of posts to display
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await BlogService.getPostsByUserId(userId);
        setPosts(response.data.content); // Assuming the API returns paginated data
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    try {
      // Call the delete API
      await BlogService.deletePost(postId);

      // Remove the post from the local state
      setPosts(posts.filter((post) => post.postId !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openUpdateDialog = (post) => {
    setCurrentPost(post);
    setUpdatedContent(post.content);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!currentPost) return;

    try {
      // Call the update API
      const updatedPost = await BlogService.updatePost(currentPost.postId, {
        content: updatedContent,
      });

      // Update the local state with the updated post
      setPosts(
        posts.map((post) =>
          post.postId === currentPost.postId
            ? { ...post, content: updatedPost.data.content }
            : post
        )
      );

      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, posts.length));
  };

  const showLess = () => {
    setVisibleCount((prev) => Math.max(prev - 5, 5));
  };

  // Get only the posts we want to display
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" />
              My Blog Posts
            </h3>
          </div>

          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              You haven't created any posts yet.
            </p>
          ) : (
            <>
              <div className="space-y-6">
                {visiblePosts.map((post) => (
                  <div key={post.postId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-muted-foreground">
                        <TimeAgo createdAt={post.createdAt} />
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openUpdateDialog(post)}
                          className="h-10 w-10"
                        >
                          <Pencil size={18} className="text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(post.postId)}
                          className="h-10 w-10"
                        >
                          <Trash2 size={18} className="text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <p className="mt-2">{post.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                {visibleCount > 5 && (
                  <Button
                    size="sm"
                    onClick={showLess}
                    className="flex items-center text-white gap-1 bg-blue-500"
                  >
                    <ChevronUp size={16} />
                    Show Less
                  </Button>
                )}

                {visibleCount < posts.length && (
                  <Button
                    size="sm"
                    onClick={showMore}
                    className="flex items-center text-white gap-1 bg-blue-500"
                  >
                    <ChevronDown size={16} />
                    Show More
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[500px] w-7/12">
          <DialogHeader>
            <DialogTitle>Update Blog Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                placeholder="Enter post content"
                rows={12}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserBlogPosts;
