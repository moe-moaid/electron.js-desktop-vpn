import React, { useEffect, useRef, useState } from "react";
// import i18n from "../i18n.js";
import i18n from "../i18n.js";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  const options = [
    { label: "Arabic - ar", value: "ar" },
    { label: "German - de", value: "de" },
    { label: "English - en", value: "en" },
    { label: "Spanish - es", value: "es" },
    { label: "French - fr", value: "fr" },
    { label: "Italian - it", value: "it" },
    { label: "Korean - ko", value: "ko" },
    { label: "Dutch - nl", value: "nl" },
    { label: "Thai - th", value: "th" },
    { label: "Urdu - ur", value: "ur" },
    { label: "Vietnamies - vi", value: "vi" },
    { label: "Chinese - zh", value: "zh" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedItem(option);
    setIsOpen(false);
    i18n.changeLanguage(option.value);
    localStorage.setItem('lang', option.value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function altOption() {
    const  currentLang = localStorage.getItem('lang');
    const lang = options.find((opt, i) => {
      return opt.value === currentLang;
    });
    return lang;
  }

  console.log(altOption());

  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="bg-transparent text-[#F5F5F5] px-5 max-h-60 overflow-auto border border-1 border-[#1A2646] py-2 rounded-md"
        >
          {selectedItem ? selectedItem.label : altOption().label}
          <svg
            className="inline-block ms-3"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99964 9.25456C7.72776 9.25456 7.46695 9.14375 7.27889 8.94744L1.02145 2.44006C0.834701 2.246 0.741889 1.99587 0.741889 1.74612C0.741889 1.48362 0.844452 1.22131 1.04901 1.02462C1.44764 0.641375 2.08139 0.653562 2.46445 1.05219L7.99964 6.809L13.5354 1.05238C13.9185 0.65375 14.5518 0.641375 14.951 1.02481C15.3491 1.40788 15.3615 2.04181 14.9784 2.44025L8.72151 8.94763C8.5327 9.14375 8.27245 9.25456 7.99964 9.25456Z"
              fill="#989898"
            />
          </svg>
        </button>
        {isOpen && (
          <ul className="absolute bg-white shadow-md w-full mt-1 rounded-md max-h-60 overflow-auto z-10">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
