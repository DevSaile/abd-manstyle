import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
	return (
		<motion.div
			className=' bg-white overflow-hidden shadow-2xl rounded-xl border border-gray-700'
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
		>
			
			<div className='px-4 py-10 sm:p-6'>
				<span className='flex items-center text-sm font-medium text-black'>
					<Icon size={20} className='mr-2' style={{ color }} />
					{name}
				</span>
				<p className='mt-1 text-3xl font-semibold'>{value}</p>
			</div>
		</motion.div>
	);
};
export default StatCard;