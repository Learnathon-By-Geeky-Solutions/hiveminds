const InputField = ({
  icon: Icon,
  value,
  name,
  type,
  placeholder,
  onChange,
  error,
  errorMessage,
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
        className={`w-full p-4 pl-12 rounded-lg border ${error ? 'border-red-500' : 'border-white/10'} bg-secondary/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500/50' : 'focus:ring-primary/50'} transition-all`}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
