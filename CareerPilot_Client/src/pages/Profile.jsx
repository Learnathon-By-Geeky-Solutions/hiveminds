import ApplicationSection from "@/components/profile/ApplicationSection";
import JobPreference from "@/components/profile/JobPreference";
import RecommendationsSection from "@/components/profile/RecommendationsSection";
import Skills from "@/components/profile/Skills";
import UserDetails from "@/components/profile/UserDetails";

const Profile = () => {
  

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-24 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <UserDetails />
            <JobPreference />
          </div>
          <div className="lg:w-3/4">
            <Skills />
            <ApplicationSection/>
            <RecommendationsSection/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
