import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
    return (
     <motion.div
  className="bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 transition-transform flex flex-col justify-between w-full max-h-32"
  initial={{
    boxShadow: "-6px 6px 2px rgba(0, 0, 0, 0.3)",
  }}
  whileHover={{
    scale: 1.03,
    y: -6,
    x: 6,
    boxShadow: "-12px 12px 2px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  }}
  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
>
  <div className="px-4 pt-6">
    <span className="flex items-center text-md font-medium text-black">
      <Icon size={30} className="mr-2" style={{ color }} />
      {name}
    </span>
  </div>
  <div className="px-4 pb-6 flex justify-end">
    <p className="text-2xl font-semibold">{value}</p>
  </div>
</motion.div>
    );
};

export default StatCard;