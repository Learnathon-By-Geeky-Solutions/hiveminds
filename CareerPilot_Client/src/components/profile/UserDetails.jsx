import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { Edit, LogOut, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileDialog from "./EditProfileDialog";

const UserDetails = () => {
  const [updateDialog, setUpdateDialog] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { user, setUser, loading } = useUser();
  const handleLogout = (e) => {
    e.preventDefault();
    setToken(null);
    navigate("/login");
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-28 bg-gradient-to-r from-primary/30 to-primary/10"></div>
      <CardContent className="pt-0 -mt-12">
        <div className="flex flex-col items-center">
          {/* <Avatar className="w-24 h-24 border-4 border-card">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={user.username}
            />
            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
          </Avatar> */}
          <div className="mt-3 text-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {user.username}
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            </h2>
            {/* <p className="text-muted-foreground">{user.position}</p> */}
            {/* <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin size={12} />
              {user.location}
            </p> */}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <User size={16} className="text-primary" />
            <span>{user.firstName}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User size={16} className="text-primary" />
            <span>{user.lastName}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-primary" />
            <span>{user.email}</span>
          </div>
          {/* <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-primary" />
            <span>{user.phone}</span>
          </div> */}
          {/* <div className="flex items-center gap-3 text-sm">
            <Globe size={16} className="text-primary" />
            <a
              href={`https://${user.portfolio}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {user.portfolio}
            </a>
          </div> */}
          {/* <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-primary" />
            <span>Joined {user.joinDate}</span>
          </div> */}
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Button className="w-full" size="lg" onClick={() => setUpdateDialog(true)}>
            <Edit size={14} className="mr-2" /> Edit Profile
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut size={14} className="mr-2" /> Log Out
          </Button>
        </div>
      </CardContent>
      <EditProfileDialog open={updateDialog} onOpenChange={setUpdateDialog}/>
    </Card>
  );
};

export default UserDetails;
