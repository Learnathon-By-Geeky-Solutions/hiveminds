import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Edit,
  Globe,
  LogOut,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";

const UserDetails = () => {
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
  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...");
  };
  return (
    <div className="lg:w-1/4">
      <Card className="overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-primary/30 to-primary/10"></div>
        <CardContent className="pt-0 -mt-12">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 border-4 border-card">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-3 text-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {user.name}
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              </h2>
              <p className="text-muted-foreground">{user.position}</p>
              <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin size={12} />
                {user.location}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-primary" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-primary" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Globe size={16} className="text-primary" />
              <a
                href={`https://${user.portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {user.portfolio}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-primary" />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Button className="w-full" size="sm">
              <Edit size={14} className="mr-2" /> Edit Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut size={14} className="mr-2" /> Log Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* <JobPreferences preferences={user.preferences} /> */}
    </div>
  );
};

export default UserDetails;
