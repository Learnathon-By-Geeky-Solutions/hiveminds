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
      {Icon && (
        <div className="absolute left-0 flex items-center pl-4 h-full">
          <Icon size={20} className="text-primary" />
        </div>
      )}
      <input
        type={type}
        value={value}
        name={name}
        className={`w-full p-4 ${Icon ? "pl-12" : "pl-4"} rounded-lg border ${
          error ? "border-destructive" : "border-border"
        } bg-secondary/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
          error ? "focus:ring-destructive/50" : "focus:ring-primary/50"
        } transition-all`}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
      {error && errorMessage && (
        <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
