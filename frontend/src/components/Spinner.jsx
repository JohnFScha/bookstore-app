import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center min-h-[500px]">
      <div className="animate-ping w-16 h-16 rounded-full bg-sky-600 m-auto"></div>
    </div>
  );
};

export default Spinner;
