import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ComboBox = ({
  name,
  options = [],
  onSelect,
  enableSearchBar = true,
  bgColor = "bg-white",
  dropdownBgColor = "bg-white",
  inputBgColor = "bg-white",
  hoverBgColor = "hover:bg-blue-100",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(name);
  const comboBoxRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const filteredItems = options.filter(
    (item) =>
      typeof item === "string" &&
      item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative w-full"
      ref={comboBoxRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={`${bgColor} shadow-custom text-gray-400 font-bold py-2 px-4 rounded-lg inline-flex items-center w-full overflow-y-auto md:text-base text-xs`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleDropdown(e);
        }}
      >
        {selectedOption}
        <svg
          className="fill-current h-4 w-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      {isOpen && (
        <motion.div
          className={`${dropdownBgColor} rounded-lg mt-1 w-full z-10 absolute`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {enableSearchBar && (
            <input
              type="text"
              className={`${inputBgColor} text-gray-200 placeholder-gray-400 rounded-lg pl-3 py-2 focus:outline-none focus:ring-2 w-full`}
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <ul className="max-h-40 overflow-y-auto custom-scrollbar mb-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  className={`${hoverBgColor} py-2 px-4 cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption(item);
                    setSearchTerm("");
                    setIsOpen(false);
                    onSelect(item);
                  }}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="py-2 px-4 text-gray-500">No results found</li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default ComboBox;
