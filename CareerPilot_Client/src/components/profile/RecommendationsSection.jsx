import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Heart } from "lucide-react";
import { useState } from "react";

const RecommendationsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getRecommendations = () => {
    return [
      {
        logo: "https://example.com/logo1.png",
        position: "Software Engineer",
        company: "TechCorp",
        workType: "Full-Time",
        location: "Remote",
        salary: "$120,000",
        days: "3 days ago",
        match: "95% Match",
      },
      {
        logo: "https://example.com/logo2.png",
        position: "Product Designer",
        company: "DesignHub",
        workType: "Part-Time",
        location: "New York, NY",
        salary: "$80,000",
        days: "5 days ago",
        match: "90% Match",
      },
      {
        logo: "https://example.com/logo3.png",
        position: "Data Analyst",
        company: "DataWorks",
        workType: "Contract",
        location: "San Francisco, CA",
        salary: "$90,000",
        days: "7 days ago",
        match: "85% Match",
      },
    ];
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Heart size={18} className="text-primary" />
          Recommended for You
        </CardTitle>

        {/* <Tabs
          defaultValue="all"
          className="w-auto"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="bg-secondary/30 h-8">
            <TabsTrigger value="all" className="text-xs px-3 py-1">
              All
            </TabsTrigger>
            <TabsTrigger value="new" className="text-xs px-3 py-1">
              New
            </TabsTrigger>
            <TabsTrigger value="saved" className="text-xs px-3 py-1">
              Saved
            </TabsTrigger>
          </TabsList>
        </Tabs> */}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          AI-powered job recommendations based on your profile
        </p>

        <div className="space-y-3">
          {getRecommendations().map((job, index) => (
            <div
              key={index}
              className="p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded bg-secondary/50 overflow-hidden mt-1">
                    {/* <img
                      src={job.logo}
                      alt={job.company}
                      className="w-full h-full object-cover"
                    /> */}
                    <Bot size={16} className="w-full h-full text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{job.position}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      <Badge className="bg-white text-xs font-normal">
                        {job.workType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{job.salary}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {job.days}
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-2 text-xs font-normal bg-primary/10 text-primary"
                  >
                    {job.match}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6">
          View More Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendationsSection;
