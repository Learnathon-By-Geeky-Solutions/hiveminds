import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const CommunityList = ({
  communities,
  selectedCommunity,
  onSelectCommunity,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter communities based on search query
  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-2">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Communities
        </CardTitle>

        {/* Search input */}
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full bg-background/60"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => (
            <Card
              key={community.id}
              className={`hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                selectedCommunity?.id === community.id
                  ? "border-primary/50 bg-accent/5 shadow-md"
                  : "hover:border-accent/50 hover:bg-accent/5"
              }`}
              onClick={() => onSelectCommunity(community)}
            >
              <CardContent className="p-5 space-y-3">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {community.name}
                </h3>
                {/* <p className="text-sm text-muted-foreground/90">
                  {community.description}
                </p> */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-background/50 backdrop-blur-sm transition-colors group-hover:border-primary/50"
                  >
                    {community.category || "Uncategorized"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-background/50 backdrop-blur-sm transition-colors group-hover:border-primary/50"
                  >
                    {community.memberCount || 0} members
                  </Badge>
                  <Badge
                    variant={
                      community.visibility === "PUBLIC"
                        ? "secondary"
                        : "outline"
                    }
                    className="bg-background/50 backdrop-blur-sm"
                  >
                    {community.visibility || "Public"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            {searchQuery
              ? "No communities match your search"
              : "No communities found"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityList;
