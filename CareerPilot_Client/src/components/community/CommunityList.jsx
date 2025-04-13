import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateCommunityDialog from "./CreateCommunityDialog";

const CommunityList = ({
  communities,
  selectedCommunity,
  onSelectCommunity,
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCommunityCreated = (newCommunity) => {
    // TODO: Update communities list with the new community
    console.log("New community created:", newCommunity);
  };
  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Popular Communities
        </CardTitle>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          size="sm"
          className="rounded-full h-10 w-10 p-0 transition-all hover:scale-110 hover:shadow-lg bg-primary/90 hover:bg-primary"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {communities.map((community) => (
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
              <p className="text-sm text-muted-foreground/90">
                {community.description}
              </p>
              <Badge
                variant="outline"
                className="mt-1 bg-background/50 backdrop-blur-sm transition-colors group-hover:border-primary/50"
              >
                {community.members.toLocaleString()} members
              </Badge>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CreateCommunityDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCommunityCreated={handleCommunityCreated}
      />
    </Card>
  );
};

export default CommunityList;
