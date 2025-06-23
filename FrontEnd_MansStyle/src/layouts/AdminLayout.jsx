import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="flex h-screen bg-white text-white overflow-y-auto">
      {/* Sidebar */}
      <div className="absolute top-0 left-0 h-full z-30">
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content */}
      <motion.div
        animate={{
          marginLeft: isSidebarOpen ? 208 : 0, // 224px = 14rem
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
        className="flex-1 flex flex-col"
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          title={title}
        />

        <div className="flex-1 relative z-10 overflow-y-auto text-black scrollbar-hidden">
          <Outlet context={{ setTitle }} />
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLayout;
