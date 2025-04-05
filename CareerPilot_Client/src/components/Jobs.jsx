import { Link } from "react-router-dom";
import JobCard from "./JobCard";

const Jobs = () => {
  // Dummy job listings
  const jobListings = [
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
      type: "Part-time",
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
      type: "Intership",
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

  return (
    <section id="jobs" className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover your perfect role among our carefully selected job listings
            from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings.map((job, index) => (
            <JobCard key={index} {...job} delayIndex={index} />
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in">
          {/* <a
            href="#all-jobs"
            className="inline-block px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200"
          >
            View All Jobs
          </a> */}
          <Link
            to="/all-jobs"
            className="inline-block px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
