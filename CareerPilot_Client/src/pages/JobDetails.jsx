import { useCompany } from "@/contexts/CompanyContext";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const jobId = parseInt(id);
  const { company, publicJobs } = useCompany();
  const job = publicJobs.find((job) => job.id === jobId);

  // If no job is found, show a fallback message
  if (!job) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Job Not Found</h1>
          <p className="text-gray-400 mt-4">
            The job you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto py-20">
        {/* Job Header */}
        <div className="glass-card rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            <div className="h-16 w-16 rounded-lg overflow-hidden bg-secondary flex items-center justify-center flex-shrink-0">
              <img
                src={job.logo || "/placeholder.svg"}
                alt={`${job.company} logo`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {job.jobTitle}
                </h1>

                <div className="flex gap-2">
                  {job.isNew && (
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
                      New
                    </span>
                  )}
                  {job.isFeatured && (
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-400/20 text-purple-400 font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                <div className="flex items-center">
                  <span>{job.jobCategory}</span>
                </div>
                <div className="flex items-center">
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <span>
                    $
                    {`${job.lowerSalary || "N/A"} -$ ${
                      job.upperSalary || "N/A"
                    }`}
                  </span>
                </div>
                <div className="flex items-center">
                  <span>{job.jobType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {job.skills?.map((skill, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-gray-300"
              >
                {skill.skill.skillName}
              </span>
            ))}
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="text-gray-300 space-y-4">
              <p>{job.jobDescription}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              {job.requirements.split("\n").map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Application Deadline */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Application Deadline</h2>
            <p className="text-gray-300">{job.applicationDeadline}</p>
          </div>
        </div>

        {/* Apply Button */}
        <div className="glass-card rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Interested in this position?
          </h2>
          <p className="text-gray-300 mb-6">
            Apply now and take the next step in your career journey.
          </p>
          <button className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors">
            Apply for this position
          </button>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
