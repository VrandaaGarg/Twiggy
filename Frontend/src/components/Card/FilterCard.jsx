import React from "react";

function FilterCard({ variableFunc, Name, variable, label }) {
  return (
    <div
      className={`bg-white px-5 border border-black rounded-xl max-w-max ${
        { variable } ? "bg-gray-400" : ""
      }`}
    >
      <input
        type="checkbox"
        name={Name}
        id={Name}
        className="mr-4"
        checked={variable}
        onChange={(e) => variableFunc(e.target.checked)}
      />
      <label htmlFor={Name}>{label}</label>
    </div>
  );
}

export default FilterCard;
