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
    href: "/admin/inicio",
  },
  {
    name: "Productos",
    icon: ShoppingBag,
    href: "/admin/productos",
  },
  {
    name: "Compra",
    icon: ShoppingCart,
    href: "/admin/compra",
  },
  {
    name: "Venta",
    icon: DollarSign,
    href: "/admin/venta",
  },
  {
    name: "Usuarios",
    icon: CircleUser,
    href: "/admin/usuarios",
  },
  {
    name: "Registros de Ventas",
    icon: NotebookPen,
    href: "/admin/registrosventas",
  },
  {
    name: "Registros de Compras",
    icon: BaggageClaim,
    href: "/admin/registroscompras",
  },
  {
    name: "Categorias",
    icon: TableProperties,
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
          ["Productos", "Venta"].includes(item.name)
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
          animate={{
            width: window.innerWidth < 768 ? "100vw" : 224,
            opacity: 1,
          }}
          exit={{ width: 0, opacity: 0 }}
          transition={{
            width: { type: "spring", stiffness: 400, damping: 30 },
            opacity: { duration: 0.15 },
          }}
          className="mr-5m h-full bg-gradient-to-br from-white to-[#E0F2FE] p-3 flex flex-col border-r-4 border-blue-700 overflow-hidden"
          style={{
            minWidth: 0,
            maxWidth: 224,
            position: "relative",
            zIndex: 20,
          }}
        >
          <div
            className="mb-8 text-xl font-bold text-slate-900 text-center"
            style={{
              boxShadow: "-3px 3px 1px rgba(0, 0, 0, 0.3)",
              padding: "0.25rem 0.5rem", // optional for visual spacing
              borderRadius: "0.5rem", // optional for softer look
              backgroundColor: "white", // optional if you want it to pop more
            }}
          >
            Man's Style
          </div>

          <nav className="flex-grow">
            {filteredSidebarItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className="group flex items-center p-3 text-sm font-medium rounded-lg bg-white border border-slate-50 hover:bg-[#6366f1] transition-colors mb-2"
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                    x: 6,
                    boxShadow: "-6px 6px 2px rgba(0, 0, 0, 0.3)",
                    transition: {
                      duration: 0.15,
                      ease: "easeOut",
                    },
                  }}
                  style={{
                    boxShadow: "-3px 3px 1px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-lg mr-3 transition-all
            group-hover:bg-[#6366f1] group-hover:!text-white`}
                    style={{
                      background: `${item.color}22`,
                      color: "#475DCD",
                    }}
                  >
                    <item.icon size={20} />
                  </span>
                  <span
                    className="whitespace-nowrap transition-colors group-hover:!text-white"
                    style={{ color: "#475DCD" }}
                  >
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            ))}
            <button onClick={handleLogout} className="w-full text-left">
              <motion.div
                className="group flex items-center p-3 text-sm font-medium rounded-lg bg-white border border-slate-50 hover:bg-red-500 transition-colors mb-2 mt-6"
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  x: 6,
                  boxShadow: "-6px 6px 2px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
                style={{
                  boxShadow: "-3px 3px 1px rgba(0, 0, 0, 0.3)",
                }}
              >
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-lg mr-3 transition-all group-hover:bg-white group-hover:text-red-500"
                  style={{
                    background: "#ef4444", // rojo Tailwind
                    color: "white",
                  }}
                >
                  <LogOut size={20} />
                </span>
                <span className="whitespace-nowrap transition-colors group-hover:text-white text-[#ef4444]">
                  Cerrar Sesión
                </span>
              </motion.div>
            </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
