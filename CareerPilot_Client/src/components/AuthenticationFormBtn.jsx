import React from "react";

const AuthenticationFormBtn = ({btnText}) => {
  return (
    <button
      type="submit"
      className="w-full px-6 py-4 rounded-lg bg-gradient-blue text-white font-medium tracking-wide transition-all duration-300 hover:brightness-110 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center gap-2"
    >
      {btnText}
    </button>
  );
};

export default AuthenticationFormBtn;
