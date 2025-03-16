import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react"; // Import the User icon
import { useState } from "react";

const JobPreference = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    portfolio: "johndoe.com",
    position: "Senior Software Engineer",
    joinDate: "March 2023",
    status: "active",
    avatar: "https://github.com/shadcn.png",
    preferences: {
      roles: [
        "Software Engineer",
        "Frontend Developer",
        "Full Stack Developer",
      ],
      locations: ["San Francisco", "Remote", "New York"],
      workTypes: ["Full-time", "Contract"],
      salary: "$120,000 - $150,000",
    },
  });

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <User size={18} className="text-primary" />
            Job Preferences
          </h3>
        </div>

        <div className="space-y-4">
          {/* Preferred Roles */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Preferred Roles
            </h3>
            <div className="flex flex-wrap gap-1">
              {user.preferences.roles.map((role, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Locations
            </h3>
            <div className="flex flex-wrap gap-1">
              {user.preferences.locations.map((location, index) => (
                <Badge key={index} variant="outline" className="font-normal">
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          {/* Work Type */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Work Type
            </h3>
            <div className="flex gap-2">
              {user.preferences.workTypes.map((type, index) => (
                <Badge
                  key={index}
                  className={
                    type === "Remote"
                      ? "bg-green-500/20 text-green-300 font-normal"
                      : "bg-blue-500/20 text-blue-300 font-normal"
                  }
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Salary Range
            </h3>
            <p className="text-sm">{user.preferences.salary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPreference;
