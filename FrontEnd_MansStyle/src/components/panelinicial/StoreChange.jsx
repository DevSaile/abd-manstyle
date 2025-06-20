import React from "react";
import { motion } from "framer-motion";
import { Store, StoreIcon } from "lucide-react";

const StoreToggleCard = ({ isPrimary, toggleStore }) => {
	const iconColor = isPrimary ? "#F59E0B" : "#3B82F6";
	const label = isPrimary ? "Tienda Primaria" : "Tienda Principal";
	const Icon = isPrimary ? StoreIcon : Store;

	return (
		<motion.div
			onClick={toggleStore}
			className='cursor-pointer bg-white overflow-hidden shadow-lg rounded-xl border border-gray-700 hover:shadow-2xl transition-shadow'
			whileHover={{ y: -5 }}
		>
			<div className='flex flex-col items-center justify-center px-4 py-10'>
				<Icon size={40} style={{ color: iconColor }} />
				<span className='mt-4 text-lg font-semibold text-black'>{label}</span>
			</div>
		</motion.div>
	);
};

export default StoreToggleCard;
