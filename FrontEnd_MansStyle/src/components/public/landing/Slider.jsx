import { motion } from "framer-motion";
import { useState } from "react";

const Slider = ({ images }) => {
  const [index, setIndex] = useState(0);

  const slideWidth = 240; // Total space per image (image + margin)
  const total = images.length;

  // Helper for circular index
  const circularIndex = (i) => (i + total) % total;

  return (
    <div className="relative w-full h-96 flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((img, i) => {
          // Calculate position offset from the current index
          const relativeIndex = i - index;

          // Adjust for circular behavior
          let offset =
            relativeIndex > total / 2
              ? relativeIndex - total
              : relativeIndex < -total / 2
              ? relativeIndex + total
              : relativeIndex;

          const x = offset * slideWidth;
          const isActive = i === index;
          const isNear =
            Math.abs(offset) === 1 || Math.abs(offset) === total - 1;

          return (
            <motion.div
              key={i}
              onClick={() => setIndex(i)}
              className="cursor-pointer absolute top-1/2 left-1/2"
              animate={{
                x,
                y: "-50%",
                scale: isActive ? 1 : 0.85,
                opacity: isActive || isNear ? 1 : 0.3,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: 200, marginLeft: -100 }} // half width to center the image
            >
              <div className="relative">
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="w-full h-64 object-cover rounded-xl shadow-xl"
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
