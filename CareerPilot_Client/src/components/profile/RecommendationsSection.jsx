import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Heart } from "lucide-react";

const RecommendationsSection = () => {
  const getRecommendations = () => {
    return [
      {
        position: "Senior Frontend Developer",
        category: "Software Development",
        salary: "$120,000 - $150,000"
      },
      {
        position: "UI/UX Product Designer",
        category: "Design",
        salary: "$90,000 - $120,000"
      },
      {
        position: "Data Science Team Lead",
        category: "Data Science",
        salary: "$140,000 - $180,000"
      }
    ];
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot size={18} className="text-primary" />
          Recommended Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {getRecommendations().map((job, index) => (
            <div
              key={index}
              className="p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">{job.position}</h3>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">
                    {job.category}
                  </Badge>
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsSection;
