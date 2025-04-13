import CommunityDetails from "@/components/community/CommunityDetails";
import CommunityList from "@/components/community/CommunityList";
import { useState } from "react";

// Placeholder data for communities, posts, and users
const placeholderCommunities = [
  {
    id: 1,
    name: "Tech Enthusiasts",
    members: 1200,
    description: "A community for tech lovers and innovators",
  },
  {
    id: 2,
    name: "Design Hub",
    members: 800,
    description: "Connect with fellow designers and creatives",
  },
  {
    id: 3,
    name: "Career Growth Network",
    members: 1500,
    description: "Share career advice and growth opportunities",
  },
];

// Placeholder data for community posts
const placeholderPosts = [
  {
    id: 1,
    communityId: 1,
    title: "Latest Tech Trends 2024",
    content: "Discussing emerging technologies and their impact...",
    author: "John Doe",
    timestamp: "2024-01-15",
    likes: 45,
  },
  {
    id: 2,
    communityId: 1,
    title: "AI in Modern Development",
    content: "How AI is transforming software development...",
    author: "Jane Smith",
    timestamp: "2024-01-14",
    likes: 32,
  },
  {
    id: 3,
    communityId: 2,
    title: "UI/UX Best Practices",
    content: "Essential design principles for modern applications...",
    author: "Mike Johnson",
    timestamp: "2024-01-13",
    likes: 28,
  },
];

// Placeholder data for community users
const placeholderUsers = [
  {
    id: 1,
    communityId: 1,
    name: "John Doe",
    role: "Tech Lead",
    joinDate: "2023-12-01",
    contributions: 15,
  },
  {
    id: 2,
    communityId: 1,
    name: "Jane Smith",
    role: "Senior Developer",
    joinDate: "2023-12-15",
    contributions: 12,
  },
  {
    id: 3,
    communityId: 2,
    name: "Mike Johnson",
    role: "UI Designer",
    joinDate: "2023-11-20",
    contributions: 8,
  },
];

const Community = () => {
  const [communities] = useState(placeholderCommunities);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8 mt-14 min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center mb-12 text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-gradient">
          Community Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Connect, collaborate, and grow with fellow professionals in our
          vibrant communities
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <CommunityList
          communities={communities}
          selectedCommunity={selectedCommunity}
          onSelectCommunity={setSelectedCommunity}
        />
        <CommunityDetails
          selectedCommunity={selectedCommunity}
          placeholderPosts={placeholderPosts}
          placeholderUsers={placeholderUsers}
        />
      </div>
    </div>
  );
};

export default Community;
