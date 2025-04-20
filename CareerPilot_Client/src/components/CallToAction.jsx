import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 animate-fade-in-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Take the Next Step in Your{" "}
            <span className="text-gradient">Career Journey</span>
          </h2>

          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of job seekers who have found their dream jobs
            through our platform. Our intelligent matching system connects you
            with opportunities that align with your skills and career goals.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              className="px-6 py-3 rounded-lg bg-gradient-blue text-white font-medium transition-all duration-300 hover:brightness-110 hover:scale-[1.03]"
              to={"/signup"}
            >
              {" "}
              Create Acconut
            </Link>

            <a
              href="#learn-more"
              className="px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 relative animate-fade-in-right">
          <div className="relative z-10 glass-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-primary mb-2 font-medium">
                    {feature.title}
                  </div>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-blue text-white p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="font-medium">Job Match Score</div>
                <div className="text-lg font-bold">94%</div>
              </div>

              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full rounded-full"
                  style={{ width: "94%" }}
                ></div>
              </div>

              <div className="mt-6 text-sm text-white/80">
                Based on your profile, skills, and preferences
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/30 rounded-full filter blur-xl"></div>
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-400/20 rounded-full filter blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Personalized Job Matches",
    description:
      "AI-powered recommendations based on your unique skills and experience",
  },
  {
    title: "Application Tracking",
    description:
      "Keep track of all your applications in one organized dashboard",
  },
  {
    title: "Career Insights",
    description: "Access salary data and growth trends for informed decisions",
  },
  {
    title: "Direct Employer Contact",
    description: "Connect directly with hiring managers at top companies",
  },
];

export default CallToAction;
