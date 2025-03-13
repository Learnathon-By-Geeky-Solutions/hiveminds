import React from "react";

const InputField = ({
  icon: Icon,
  value,
  name,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary">
            <Icon size={18} />
          </div>
        )}
      </div>
      <input
        type={type}
        value={value}
        name={name}
        className="w-full p-4 pl-12 rounded-lg border border-white/10 bg-secondary/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
