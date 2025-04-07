import CustomLoader from "@/components/CustomLoader";
import JobCard from "@/components/JobCard";
import { useCompany } from "@/contexts/CompanyContext";
import { Link, Outlet, useMatch } from "react-router-dom";

const AllJobs = () => {
  const { publicJobs, publicJobError, publicJobLoading } = useCompany();

  const isJobDetailsPage = useMatch("/jobs/job/:id");

  // Loading state
  if (publicJobLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">
          <CustomLoader />
        </p>
      </div>
    );
  }

  // Error state
  if (publicJobError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{publicJobError}</p>
      </div>
    );
  }

  // Empty job list
  if (!publicJobLoading && publicJobs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">No jobs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen">
        {!isJobDetailsPage && (
          <div className="container mx-auto py-28 space-y-8 px-4 md:px-6 lg:px-8">
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                Find Your Next Opportunity
              </h1>
              <p className="text-gray-200 max-w-4xl">
                Browse through our curated list of job opportunities from top
                companies around the world.
              </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicJobs.map((job, index) => (
                <Link
                  to={`/jobs/job/${job.id}`}
                  key={job.id}
                  className="block"
                  aria-label={`View details for ${job.jobTitle}`}
                >
                  <JobCard
                    title={job.jobTitle || "Untitled Job"}
                    jobCategory={job.jobCategory || "Unknown Category"}
                    location={job.location || "Remote"}
                    lowerSalary={job.lowerSalary}
                    upperSalary={job.upperSalary}
                    applicationDeadline={job.applicationDeadline || "N/A"}
                    jobType={job.jobType || "Not Specified"}
                    status={job.status || "Not Specified"}
                    skills={
                      job.skills?.map((skill) => skill.skill.skillName) || []
                    }
                    fulfilled={job.fulfilled || false}
                    delayIndex={index}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default AllJobs;
