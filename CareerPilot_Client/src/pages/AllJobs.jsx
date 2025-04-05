import CustomLoader from "@/components/CustomLoader";
import JobCard from "@/components/JobCard";
import JobPostService from "@/services/JobPostService";
import { useEffect, useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UseEffect to fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await JobPostService.getAllPublicJobPosts();
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  console.log("Jobs fetched:", jobs); // Log the fetched jobs

  const isJobDetailsPage = useMatch("/all-jobs/job/:id");

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">
          <CustomLoader />
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Empty job list
  if (!loading && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">No jobs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>All Jobs | CareerPilot</title>
        <meta
          name="description"
          content="Browse through our curated list of job opportunities from top companies around the world."
        />
      </Helmet>
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
              {jobs.map((job, index) => (
                <Link
                  to={`/all-jobs/job/${job.id}`}
                  key={job.id}
                  className="block"
                  aria-label={`View details for ${job.jobTitle}`}
                >
                  <JobCard
                    title={job.jobTitle || "Untitled Job"}
                    jobCategory={job.jobCategory || "Unknown Category"}
                    location={job.location || "Remote"}
                    salary={`${job.lowerSalary || "N/A"} - ${
                      job.upperSalary || "N/A"
                    }`}
                    applicationDeadline={job.applicationDeadline || "N/A"}
                    jobType={job.jobType || "Not Specified"}
                    status={job.status || "Not Specified"}
                    skills={job.skills?.map((skill) => skill.skillName) || []}
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
