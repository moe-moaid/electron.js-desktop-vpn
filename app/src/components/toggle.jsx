import React, { useState } from "react";

export default function Toggle({ isToggled, handleToggle }) {
  function handleClick() {
    handleToggle();
  }
  
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        className={`w-[42px] h-[24px] flex items-center rounded-full cursor-pointer transition-all duration-300 px-1 ${
          isToggled ? "bg-blue-500" : "bg-[#989898] justify-start"
        }`}
      >
        <span
          className={`block w-[15px] h-[15px] bg-[#F7F7F7] rounded-full shadow-md transition-all duration-300 ${isToggled ? 'translate-x-5' : 'translate-x-0'}`}
        ></span>
      </button>
    </div>
  );
}
