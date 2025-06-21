import React from "react";
import { motion } from "framer-motion";
import { Store, StoreIcon, ToggleLeft } from "lucide-react";

const StoreToggleCard = ({ isPrimary, toggleStore }) => {
	const iconColor = isPrimary ? "#F59E0B" : "#3B82F6";
	const label = isPrimary ? "Tienda Primaria" : "Tienda Principal";
	const Icon = isPrimary ? StoreIcon : Store;

	return (
	<motion.div
  className="bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 transition-transform max-h-32"
  initial={{
    boxShadow: "-6px 6px 2px rgba(0, 0, 0, 0.3)",
  }}
  whileHover={{
    scale: 1.03,
    y: -6,
    x: 6,
    boxShadow: "-12px 12px 2px rgba(0, 0, 0, 0.3)", // doubles offset to cancel the move
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  }}
  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
  onClick={toggleStore}
>
			<div className='flex flex-col items-center justify-center px-4 py-3'>
				<Icon size={40} style={{ color: iconColor }} />
				<span className='mt-4 text-lg font-semibold text-black'>{label}</span>
			</div>
		</motion.div>
	);
};

export default StoreToggleCard;
