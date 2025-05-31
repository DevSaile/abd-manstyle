import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Slider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const slideRef = useRef(null);

  // Calculate the width of each slide dynamically
  const slideWidth = slideRef.current ? slideRef.current.offsetWidth : 280;
  const margin = 16; // Adjust this value based on your design
  const total = images.length;

  // Helper for circular index
  const circularIndex = (i) => (i + total) % total;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 1500); // Change slide every 1.5 seconds
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="relative w-full h-96 flex justify-center items-center overflow-hidden p-2">
      <div className="relative w-full h-full">
        {images.map((img, i) => {
          const relativeIndex = i - index;
          let offset =
            relativeIndex > total / 2
              ? relativeIndex - total
              : relativeIndex < -total / 2
              ? relativeIndex + total
              : relativeIndex;

          const x = offset * (slideWidth + margin);
          const isActive = i === index;
          const isNear = Math.abs(offset) === 1 || Math.abs(offset) === total - 1;

          return (
            <motion.div
              key={i}
              onClick={() => setIndex(i)}
              className="cursor-pointer absolute top-1/2 left-1/2"
              animate={{
                x: x,
                y: "-50%",
                scale: isActive ? 1 : 0.85,
                opacity: isActive || isNear ? 1 : 0.3,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                width: slideWidth,
                marginLeft: -(slideWidth + margin) / 2,
              }}
              ref={i === 0 ? slideRef : null} // Set ref to the first slide
            >
              <div className="relative">
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="w-full h-72 object-cover rounded-xl shadow-xl"
                />
                {!isActive && (
                  <div className="absolute inset-0 bg-black/40 rounded-xl pointer-events-none" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
