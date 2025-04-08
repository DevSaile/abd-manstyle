import { BarChart2, ShoppingBag, Users, Zap, ChartNoAxesCombined, Contact, User} from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/panelinicial/SalesOverviewChart";
import SellsPerCategory from "../components/panelinicial/VentasPorCategoria";
import SalesChannelChart from "../components/panelinicial/SalesChannelChart";
const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					{/* Value es el valor que se refleja en la card */}
					<StatCard name='Clientes' icon={User} value='12,345' color='#6366F1' />
					<StatCard name='Productos' icon={ShoppingBag} value='567' color='#EC4899' />
					<StatCard name='Ventas' icon={ChartNoAxesCombined} value='12.5%' color='#10B981' />
                    <StatCard name='Caja' icon={BarChart2} value='12.5%' color='#10B981' />
					<StatCard name='Ganancia Neta' icon={Contact} value='1,234' color='#8B5CF6' />

					<StatCard name='Marcas' icon={BarChart2} value='12.5%' color='#10B981' />

				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<SellsPerCategory />
					<SalesChannelChart />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;
