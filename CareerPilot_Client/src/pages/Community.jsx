import CommunityDetails from "@/components/community/CommunityDetails";
import CommunityList from "@/components/community/CommunityList";
import CreateCommunityDialog from "@/components/community/CreateCommunityDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useCommunity } from "@/contexts/CommunityContext";
import { cn } from "@/lib/utils";
import { Compass, Loader2, PlusCircle, Search, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Community = () => {
  const { token } = useAuth();
  const { communities, loading, error, fetchCommunities } = useCommunity();
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const handleCommunityCreated = () => {
    fetchCommunities();
  };

  // Filter communities based on search and active tab
  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.category?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "tech" && community.category?.includes("Tech"))
      return matchesSearch;
    if (activeTab === "career" && community.category?.includes("Career"))
      return matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-1/3 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/3 -right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with like-minded professionals, share knowledge, and grow
            your network
          </p>
        </div>

        {/* Search and create community */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between max-w-4xl mx-auto mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full bg-background/80 focus:bg-background"
            />
          </div>

          {token && (
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="mt-4 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Create Community
            </Button>
          )}
        </div>

        {/* Filter tabs */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto mb-6"
        >
          <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-muted/50">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Compass size={16} />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="tech" className="flex items-center gap-2">
              <Zap size={16} />
              <span>Technology</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="flex items-center gap-2">
              <Users size={16} />
              <span>Career</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive p-6 rounded-lg bg-destructive/10 max-w-md mx-auto">
            <p>{error}</p>
            <Button
              variant="outline"
              onClick={fetchCommunities}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Communities list */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-4">
                  Communities ({filteredCommunities.length})
                </h2>
                <CommunityList
                  communities={filteredCommunities}
                  selectedCommunity={selectedCommunity}
                  onSelectCommunity={setSelectedCommunity}
                />
              </div>
            </div>

            {/* Community details */}
            <div className="md:col-span-2">
              <CommunityDetails selectedCommunity={selectedCommunity} />
            </div>
          </div>
        )}
      </div>

      {/* Stats section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-border/40">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {communities.length}+
            </div>
            <div className="text-muted-foreground">Active Communities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Daily Discussions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <div className="text-muted-foreground">Professionals Connected</div>
          </div>
        </div>
      </div>

      {/* Testimonials / Call-to-action */}
      {!token && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <Card className="bg-gradient-to-br from-card/40 via-card/60 to-card/40 backdrop-blur-lg border-accent/20">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-4">
                Join our growing community today
              </h2>
              <p className="text-muted-foreground max-w-2xl mb-6">
                Connect with like-minded professionals, share knowledge, and
                accelerate your career growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-primary hover:bg-primary/90"
                  )}
                >
                  Sign Up Now
                </a>
                <a
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" })
                  )}
                >
                  Log In
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Community Dialog */}
      <CreateCommunityDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCommunityCreated={handleCommunityCreated}
      />
    </div>
  );
};

export default Community;
