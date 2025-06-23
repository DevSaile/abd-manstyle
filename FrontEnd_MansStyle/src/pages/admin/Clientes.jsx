import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/common/StatCard";
import ClientsTable from "@/components/clientes/TablaClientes";
import { useOutletContext } from "react-router-dom";

const ClientsPage = () => {
   const { setTitle } = useOutletContext();
    useEffect(() => {
      setTitle("Dashboard");
    }, [setTitle]);
  
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Clientes Totales"
            icon={UserPlus}
            value={userStats.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Clientes Nuevos (Mes)"
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
        </motion.div>

        <ClientsTable />

        {/* USER CHARTS */}
      </main>
    </div>
  );
};
export default ClientsPage;
