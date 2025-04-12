import { Link } from "react-router-dom";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/contexts/CompanyContext";
import CustomLoader from "@/components/CustomLoader";

const Jobs = () => {
  const { publicJobs, publicJobLoading, publicJobError } = useCompany();
  const displayJobs = publicJobs.slice(0, 6);

  if (publicJobLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CustomLoader />
      </div>
    );
  }

  if (publicJobError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{publicJobError}</p>
      </div>
    );
  }

  return (
    <section id="jobs" className="py-20 min-h-screen px-6 bg-gradient-to-b from-background to-background/80">
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-gradient">Featured Jobs</h2>
        <p className="text-gray-200 mb-12 max-w-2xl mx-auto">Discover your next career move with our handpicked selection of top opportunities from leading companies.</p>
        <div className="flex justify-end mb-8">
          <Link to="/jobs">
            <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-colors">
              See all jobs
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayJobs.map((job, index) => (
            <Link
              to={`/jobs/job/${job.id}`}
              key={job.id}
              className="block transform hover:scale-105 transition-transform duration-300"
              aria-label={`View details for ${job.jobTitle}`}
            >
              <JobCard
                key={job.id}
                title={job.jobTitle || "Untitled Job"}
                jobCategory={job.jobCategory || "Unknown Category"}
                location={job.location || "Remote"}
                lowerSalary={job.lowerSalary}
                upperSalary={job.upperSalary}
                applicationDeadline={job.applicationDeadline || "N/A"}
                jobType={job.jobType || "Not Specified"}
                status={job.status || "Not Specified"}
                skills={job.skills?.map((skill) => skill.skill.skillName) || []}
                fulfilled={job.fulfilled || false}
                delayIndex={index}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;