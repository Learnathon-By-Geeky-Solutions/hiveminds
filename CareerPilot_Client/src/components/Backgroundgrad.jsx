import React from "react";

const Backgroundgrad = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-background">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
    </div>
  );
};

export default Backgroundgrad;
