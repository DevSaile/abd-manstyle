import {
  LogOut,
  BarChart2,
  CircleUser,
  DollarSign,
  NotebookPen,
  ShoppingBag,
  ShoppingCart,
  TableProperties,
  BaggageClaim,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Panel Inicial",
    icon: BarChart2,
    color: "#6366f1",
    href: "/admin/inicio",
  },
  {
    name: "Productos",
    icon: ShoppingBag,
    color: "#8B5CF6",
    href: "/admin/productos",
  },
  { name: "Compras", icon: ShoppingCart, color: "#EC4899", href: "/admin/compra" },
  { name: "Ventas", icon: DollarSign, color: "#10B981", href: "/admin/venta" },
  { name: "Usuarios", icon: CircleUser, color: "#3B82F6", href: "/admin/usuarios" },
  {
    name: "Registros de Ventas",
    icon: NotebookPen,
    color: "#6EE7B7",
    href: "/admin/registrosventas",
  },
  {
    name: "Registros de Compras",
    icon: BaggageClaim,
    color: "#6E08B9",
    href: "/admin/registroscompras",
  },
  {
    name: "Categorias",
    icon: TableProperties,
    color: "#FBBF24",
    href: "/admin/categorias",
  },
];

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("rol");

  const filteredSidebarItems =
    userRole === "Administrador"
      ? SIDEBAR_ITEMS
      : SIDEBAR_ITEMS.filter((item) =>
          ["Productos", "Ventas"].includes(item.name)
        );

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("isAuthenticated");
    navigate("/", { replace: true });
    setTimeout(() => {
      window.history.pushState(null, null, window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, null, window.location.href);
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, 0);
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{         width: window.innerWidth < 768 ? "100vw" : 224,
 opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{
            width: { type: "spring", stiffness: 400, damping: 30 },
            opacity: { duration: 0.15 },
          }}
          className="h-full bg-[#18181b] p-3 flex flex-col border-r-4 border-[#6366f1] overflow-hidden"
          style={{
            minWidth: 0,
            maxWidth: 224,
            position: "relative",
            zIndex: 20,
          }}
        >
          <div className="flex items-center mb-8">
            <span className="text-xl font-bold text-white tracking-wide whitespace-nowrap">
              Man's Style
            </span>
          </div>
          <nav className="flex-grow">
            {filteredSidebarItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-[#6366f1]/20 transition-colors mb-2"
                  style={{
                    boxShadow: `0 0 8px 0 ${item.color}33`,
                  }}
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-lg mr-3 transition-all"
                    style={{
                      background: `${item.color}22`,
                      color: item.color,
                    }}
                  >
                    <item.icon size={20} />
                  </span>
                  <span className="whitespace-nowrap">{item.name}</span>
                </motion.div>
              </Link>
            ))}
            <button onClick={handleLogout} className="w-full text-left">
              <motion.div className="flex items-center p-3 text-sm font-medium rounded-lg hover:bg-[#6366f1]/20 transition-colors mb-2 mt-12">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg mr-3 bg-[#6366f1] text-[#23272f]">
                  <LogOut size={20} />
                </span>
                <span className="whitespace-nowrap">Cerrar Sesión</span>
              </motion.div>
            </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
