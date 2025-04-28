import { BarChart2, CircleUser, DollarSign, Menu, NotebookPen, Settings, ShoppingBag, ShoppingCart, Users,TableProperties, Table, BaggageClaim } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{
		name: "Panel Inicial",
		icon: BarChart2,
		color: "#6366f1",
		href: "/inicio",
	},
	{ name: "Productos", icon: ShoppingBag, color: "#8B5CF6", href: "/productos" },
	{ name: "Compras", icon: ShoppingCart, color: "#EC4899", href: "/compra" },
	{ name: "Ventas", icon: DollarSign, color: "#10B981", href: "/venta" },
	{ name: "Clientes", icon: Users, color: "#F59E0B", href: "/clientes" },
	{ name: "Usuarios", icon: CircleUser, color: "#3B82F6", href: "/usuarios" },
	{ name: "Registros de Ventas", icon: NotebookPen, color: "#6EE7B7", href: "/registrosventas" },
	{ name: "Registros de Compras", icon: BaggageClaim, color: "#6E08B9", href: "/registroscompras" },
	{name: "Categorias", icon: TableProperties, color: "#FBBF24", href: "/categorias"},
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const userRole = localStorage.getItem("rol");

	const filteredSidebarItems =
    userRole === "Administrador"
      ? SIDEBAR_ITEMS // Admins see all items
      : SIDEBAR_ITEMS.filter((item) =>
          ["Productos", "Ventas"].includes(item.name) // Other roles see only "Productos" and "Ventas"
        );

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{filteredSidebarItems.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;
