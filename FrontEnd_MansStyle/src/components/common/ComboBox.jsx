import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ComboBox = ({ name, options = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const comboBoxRef = useRef(null); // Reference to the ComboBox container

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event propagation to the modal
    setIsOpen(!isOpen);
  };

  const filteredItems = options.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close the dropdown when clicking outside
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
      className="relative"
      ref={comboBoxRef}
      onClick={(e) => e.stopPropagation()} // Prevent event propagation to the modal
    >
      <button
        className="bg-gray-700 text-gray-400 font-bold py-2 px-4 rounded-lg inline-flex items-center w-full"
        onClick={(e) => {
          e.stopPropagation(); // Prevent event propagation
          e.preventDefault(); // Prevent default action
          toggleDropdown(e);
        }}
      >
        {name}
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
          className="absolute bg-gray-700 rounded-lg mt-1 w-full shadow-lg z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()} // Prevent event propagation
        >
          <input
            type="text"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 py-2 focus:outline-none focus:ring-2"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()} // Prevent event propagation
          />
          <ul className="max-h-40 overflow-y-auto custom-scrollbar mb-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-800 py-2 px-4 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    setSearchTerm(item);
                    setIsOpen(false);
                    onSelect(item); // Notify parent of the selected item
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