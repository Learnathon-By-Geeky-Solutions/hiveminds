import { ArrowUpRight } from "lucide-react";

const JobCard = ({
  jobTitle,
  jobCategory,
  location,
  lowerSalary,
  upperSalary,
  applicationDeadline,
  jobType,
  status,
  skills,
  fulfilled,
}) => {
  return (
    <div className="glass-card rounded-xl p-6 group animate-fade-in transition-all duration-300 hover:translate-y-[-5px]">
      <div className="flex items-start gap-4">
        {/* Left Section: Placeholder for Company Logo */}
        <div className="h-12 w-12 rounded-lg overflow-hidden bg-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">{jobCategory[0]}</span>
        </div>

        {/* Right Section: Job Details */}
        <div className="flex-1">
          {/* Job Title and Quick Action Button */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-white leading-tight">
              {jobTitle}
            </h3>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Job Category and Location */}
          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-2">
            <span className="mr-3">{jobCategory}</span>
            <span className="mr-3">•</span>
            <span>{location}</span>
          </div>

          {/* Salary Range */}
          <div className="text-sm text-gray-400 mb-2">
            <span>
              Salary: ${lowerSalary} - ${upperSalary}
            </span>
          </div>

          {/* Application Deadline */}
          <div className="text-sm text-gray-400 mb-2">
            <span>Deadline: {applicationDeadline}</span>
          </div>

          {/* Job Type and Status */}
          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-2">
            <span className="mr-3">Type: {jobType}</span>
            <span className="mr-3">•</span>
            <span>Status: {status}</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Fulfilled Badge */}
          {fulfilled && (
            <div className="flex gap-2 mt-3">
              <span className="text-xs px-2 py-1 rounded-full bg-green-400/20 text-green-400 font-medium">
                Fulfilled
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
