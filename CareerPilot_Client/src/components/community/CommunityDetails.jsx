import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityPosts from "./CommunityPosts";
import CommunityUsers from "./CommunityUsers";

const CommunityDetails = ({ selectedCommunity }) => {
  return (
    <Card className="md:col-span-2 bg-gradient-to-br from-card/80 via-card/50 to-card/80 backdrop-blur-lg border border-accent/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-accent/30">
      {selectedCommunity ? (
        <CardContent className="p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
          <CardHeader className="px-0 space-y-6 relative">
            <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70 tracking-tight">
              {selectedCommunity.name}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground/90 leading-relaxed">
              {selectedCommunity.description}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="text-sm px-4 py-2 text-center bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-md border border-primary/20"
              >
                {selectedCommunity.memberCount || 0} members
              </Badge>
              {selectedCommunity.category && (
                <Badge
                  variant="outline"
                  className="text-sm px-4 py-2 text-center bg-background/50 hover:bg-background/70 transition-all duration-300 hover:scale-105 hover:shadow-md border border-border/50"
                >
                  {selectedCommunity.category}
                </Badge>
              )}
              <Badge
                variant={
                  selectedCommunity.visibility === "PUBLIC"
                    ? "secondary"
                    : "outline"
                }
                className="text-sm px-4 py-2 text-center bg-background/50 hover:bg-background/70 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                {selectedCommunity.visibility || "Public"}
              </Badge>
            </div>
          </CardHeader>

          <Tabs defaultValue="posts" className="mt-10">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-background/30 backdrop-blur-lg border border-accent/20 rounded-full overflow-hidden p-1">
              <TabsTrigger
                value="posts"
                className="text-base rounded-full transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="text-base rounded-full transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Members
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="posts"
              className="mt-8 animate-in fade-in-50 duration-500"
            >
              <CommunityPosts communityId={selectedCommunity.id} />
            </TabsContent>

            <TabsContent
              value="users"
              className="mt-8 animate-in fade-in-50 duration-500"
            >
              <CommunityUsers communityId={selectedCommunity.id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      ) : (
        <CardContent className="text-center py-20 space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
          <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70 tracking-tight">
            Select a Community
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground/90 max-w-md mx-auto leading-relaxed">
            Choose a community from the list to view its details and engage with
            fellow members.
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
};

export default CommunityDetails;
