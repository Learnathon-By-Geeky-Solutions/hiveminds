import UserDetails from "@/components/profile/UserDetails";

const Profile = () => {
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await AuthService.logout();
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-24 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <UserDetails />
        </div>
      </main>
    </div>
  );
};

export default Profile;
