import JobCard from "@/components/JobCard";
import { Link, Outlet, useMatch } from "react-router-dom";

const AllJobs = () => {
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

  const isJobDetailsPage = useMatch("/all-jobs/job/:id");

  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen">
        {!isJobDetailsPage && (
          <div className="container mx-auto py-28 space-y-8 px-4 md:px-6 lg:px-8">
            {" "}
            {/* Add padding to prevent overflow */}
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
                >
                  <JobCard
                    title={job.title}
                    company={job.company}
                    logo={job.logo}
                    location={job.location}
                    salary={job.salary}
                    tags={job.tags}
                    isNew={job.isNew}
                    isFeatured={job.isFeatured}
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
