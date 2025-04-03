const CustomLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div class="flex flex-row gap-2">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default CustomLoader;
