import Backgroundgrad from "./Backgroundgrad";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background gradient effect */}
      {/* <Backgroundgrad /> */}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="animate-fade-in">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full border border-border bg-background/80 text-primary backdrop-blur-sm">
            Your Dream Job Awaits
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Find Your <span className="text-gradient">Perfect Job</span>
            <br />
            Match in Minutes
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Discover thousands of job opportunities with all the information you
            need to apply in one place
          </p>
        </div>

        <div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-2xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
        <div className="w-5 h-10 rounded-full border-2 border-muted-foreground flex justify-center p-1">
          <div className="w-1 h-1.5 bg-muted-foreground rounded-full animate-float"></div>
        </div>
      </div>
    </section>
  );
};

const stats = [
  { value: "10K+", label: "Job Listings" },
  { value: "8K+", label: "Companies" },
  { value: "15M+", label: "Job Seekers" },
  { value: "95%", label: "Success Rate" },
];

export default Hero;
