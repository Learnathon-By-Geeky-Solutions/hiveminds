import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, ChevronRight, Clock } from "lucide-react";

const ApplicationSection = () => {
  // Define the applications array
  const applications = [
    {
      logo: "https://via.placeholder.com/50", // Placeholder image URL
      position: "Frontend Developer",
      company: "Tech Corp",
      date: "2023-10-01",
      status: "pending",
    },
    {
      logo: "https://via.placeholder.com/50",
      position: "Backend Engineer",
      company: "Data Solutions",
      date: "2023-09-28",
      status: "rejected",
    },
    {
      logo: "https://via.placeholder.com/50",
      position: "Full Stack Developer",
      company: "Innovate Inc",
      date: "2023-09-25",
      status: "accepted",
    },
  ];

  // Function to determine badge styling based on application status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300";
      case "accepted":
        return "bg-green-500/20 text-green-300";
      case "rejected":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-secondary/40 text-muted-foreground";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          Recent Applications
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View All <ChevronRight size={14} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app, index) => (
            <div
              key={index}
              className="p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded bg-secondary/50 overflow-hidden mt-1">
                    {/* <img
                      src={app.logo}
                      alt={app.company}
                      className="w-full h-full object-cover"
                    /> */}
                    <Briefcase size={16} className="w-full h-full text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{app.position}</h3>
                    <p className="text-sm text-muted-foreground">
                      {app.company}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Calendar size={12} className="inline mr-1" />
                      {app.date}
                    </p>
                  </div>
                </div>
                <Badge
                  className={cn("font-normal", getStatusColor(app.status))}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationSection;
