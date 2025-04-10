import ApplicationSection from "@/components/profile/ApplicationSection";
import JobPreference from "@/components/profile/JobPreference";
import RecommendationsSection from "@/components/profile/RecommendationsSection";
import Skills from "@/components/profile/Skills";
import UserBlogPosts from "@/components/profile/UserBlogPosts";
import UserDetails from "@/components/profile/UserDetails";
import { Outlet, useMatch } from "react-router-dom";

const Profile = () => {
  // Check if the current route matches /profile/blog
  const isBlogPage = useMatch("/profile/blog");
  const isCreateCompanyPage = useMatch("/profile/company/create");
  const isCompanyPage = useMatch("/profile/company/dashboard");

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-24 px-4 sm:px-6">
        {/* Render Profile content only if not on /profile/blog */}
        {!isBlogPage && !isCreateCompanyPage && !isCompanyPage && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <UserDetails />
              <JobPreference />
            </div>
            <div className="lg:w-3/4">
              <Skills />
              <ApplicationSection />
              <RecommendationsSection />
              <UserBlogPosts />
            </div>
          </div>
        )}
        {/* Render the nested route /blog) */}
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
