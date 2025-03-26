import {
  ArrowLeft,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  MapPin,
} from "lucide-react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  // Extract the job ID from the URL
  const { id } = useParams();

  // Dummy job data (this could also come from an API)
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      logo: "https://placehold.co/200x200/232e4a/ffffff?text=DW",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      tags: ["React", "TypeScript", "Next.js"],
      isNew: true,
      isFeatured: true,
      remote: true,
      postedDate: "2 days ago",
      description: [
        "We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications, working closely with our design and backend teams.",
        "As a Senior Frontend Developer, you will have the opportunity to shape our product and contribute to the architecture of our frontend systems.",
      ],
      requirements: [
        "5+ years of experience in frontend development",
        "Strong proficiency in React, TypeScript, and Next.js",
        "Experience with state management libraries (Redux, Zustand, etc.)",
        "Understanding of responsive design and cross-browser compatibility",
        "Knowledge of modern frontend build tools and workflows",
        "Excellent problem-solving skills and attention to detail",
      ],
      responsibilities: [
        "Develop and maintain our web applications using React and Next.js",
        "Collaborate with designers to implement UI/UX designs",
        "Write clean, maintainable, and efficient code",
        "Optimize applications for maximum speed and scalability",
        "Participate in code reviews and mentor junior developers",
        "Stay up-to-date with emerging trends and technologies",
      ],
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "DesignHub",
      logo: "https://placehold.co/200x200/232e4a/ffffff?text=DW",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Full-time",
      tags: ["Figma", "UI Design", "User Research"],
      isNew: true,
      isFeatured: false,
      remote: true,
      postedDate: "3 days ago",
      description: [
        "DesignHub is seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. You will work on a variety of projects across different industries, collaborating with our team of designers and developers.",
        "This is an opportunity to make a significant impact on how users interact with our products and services.",
      ],
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
        "Strong portfolio demonstrating your design process and skills",
        "Understanding of user-centered design principles",
        "Knowledge of design systems and component libraries",
        "Excellent communication and presentation skills",
      ],
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity designs",
        "Conduct user research and usability testing",
        "Develop and maintain design systems",
        "Collaborate with developers to ensure proper implementation",
        "Present design concepts to clients and stakeholders",
        "Stay current with design trends and best practices",
      ],
    },
    {
      id: "3",
      title: "Backend Engineer",
      company: "ServerStack",
      logo: "https://placehold.co/200x200/232e4a/ffffff?text=DW",
      location: "Austin, TX",
      salary: "$110k - $140k",
      type: "Full-time",
      tags: ["Node.js", "PostgreSQL", "AWS"],
      isNew: false,
      isFeatured: true,
      remote: false,
      postedDate: "1 week ago",
      description: [
        "ServerStack is looking for a Backend Engineer to help build and scale our cloud infrastructure. You will be responsible for designing, implementing, and maintaining our backend services and APIs.",
        "As a Backend Engineer, you will play a crucial role in ensuring the performance, reliability, and security of our systems.",
      ],
      requirements: [
        "4+ years of experience in backend development",
        "Strong proficiency in Node.js and TypeScript",
        "Experience with relational databases (PostgreSQL, MySQL)",
        "Knowledge of cloud services (AWS, GCP, or Azure)",
        "Understanding of RESTful APIs and microservices architecture",
        "Familiarity with containerization and orchestration tools",
      ],
      responsibilities: [
        "Design and implement scalable backend services",
        "Develop and maintain APIs for frontend applications",
        "Optimize database queries and ensure data integrity",
        "Implement security best practices and authentication systems",
        "Monitor and troubleshoot performance issues",
        "Collaborate with frontend developers to integrate services",
      ],
    },
    {
      id: "4",
      title: "Product Manager",
      company: "InnovateCo",
      logo: "https://placehold.co/200x200/232e4a/ffffff?text=DW",
      location: "Seattle, WA",
      salary: "$130k - $160k",
      type: "Full-time",
      tags: ["Product Strategy", "Agile", "User Stories"],
      isNew: false,
      isFeatured: false,
      remote: true,
      postedDate: "2 weeks ago",
      description: [
        "InnovateCo is seeking an experienced Product Manager to lead our product development efforts. You will be responsible for defining product vision, strategy, and roadmap, working closely with engineering, design, and marketing teams.",
        "This role requires a blend of business acumen, technical understanding, and user empathy to create products that delight our customers and drive business growth.",
      ],
      requirements: [
        "5+ years of experience in product management",
        "Strong understanding of software development lifecycle",
        "Experience with Agile methodologies and tools",
        "Excellent analytical and problem-solving skills",
        "Strong communication and stakeholder management abilities",
        "Data-driven approach to decision making",
      ],
      responsibilities: [
        "Define product vision, strategy, and roadmap",
        "Gather and prioritize product requirements",
        "Create detailed user stories and acceptance criteria",
        "Collaborate with engineering and design teams",
        "Analyze market trends and competitive landscape",
        "Measure and optimize product performance metrics",
      ],
    },
  ];

  // Find the job with the matching ID
  const job = jobs.find((job) => job.id === id);

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
        {/* <a
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to all jobs
        </a> */}

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
                  {job.title}
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
                  <Building size={16} className="mr-2" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-2" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>Posted {job.postedDate}</span>
                </div>
                {job.remote && (
                  <div className="flex items-center">
                    <Globe size={16} className="mr-2" />
                    <span>Remote Available</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="text-gray-300 space-y-4">
              {job.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-card rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Interested in this position?
          </h2>
          <p className="text-gray-300 mb-6">
            Apply now and take the next step in your career journey.
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Apply for this position
          </button>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
