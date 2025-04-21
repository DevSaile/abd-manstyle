import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import DailyOrders from "../../components/registrosventa/DailyOrders";
import OrderDistribution from "../../components/registrosventa/OrderDistribution";
import BoughtCard from "../../components/registroscompra/BoughtCard";

const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completedOrders: "1,178",
  totalRevenue: "$98,765",
};

const RegistroCompra = () => {
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Orders"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Orders"
            icon={ShoppingBag}
            value={orderStats.totalOrders}
            color="#6366F1"
          />
          <StatCard
            name="Pending Orders"
            icon={Clock}
            value={orderStats.pendingOrders}
            color="#F59E0B"
          />
          <StatCard
            name="Completed Orders"
            icon={CheckCircle}
            value={orderStats.completedOrders}
            color="#10B981"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={orderStats.totalRevenue}
            color="#EF4444"
          />
        </motion.div>

        <div className="flex flex-wrap gap-8 mb-8">
        <div className="w-full lg:w-[calc(50%-1rem)]">

          <BoughtCard
          key={1}
            employee="Jane Doe"
            client="John Smith"
            date="2025-04-20"
            total={120.5}
            amountGiven={150}
            exchange={29.5}
            products={[
              { name: "Product A", unitPrice: 25, quantity: 2 },
              { name: "Product B", unitPrice: 35.5, quantity: 2 },
            ]}
          /></div>

<div className="w-full lg:w-[calc(50%-1rem)]">
<BoughtCard
          key={2}
            employee="Jane Doe"
            client="John Smith"
            date="2025-04-20"
            total={120.5}
            amountGiven={150}
            exchange={29.5}
            products={[
              { name: "Product A", unitPrice: 25, quantity: 2 },
              { name: "Product B", unitPrice: 35.5, quantity: 2 },
            ]}
          /></div>
          <div className="w-full lg:w-[calc(50%-1rem)]">
<BoughtCard
          key={2}
            employee="Jane Doe"
            client="John Smith"
            date="2025-04-20"
            total={120.5}
            amountGiven={150}
            exchange={29.5}
            products={[
              { name: "Product A", unitPrice: 25, quantity: 2 },
              { name: "Product B", unitPrice: 35.5, quantity: 2 },
            ]}
          /></div>
          <div className="w-full lg:w-[calc(50%-1rem)]">
<BoughtCard
          key={2}
            date="2025-04-20"
            total={120.5}
			amount={5}
            amountGiven={150}
            exchange={29.5}
            products={[
              { name: "Product A", unitPrice: 25, quantity: 2 },
              { name: "Product B", unitPrice: 35.5, quantity: 2 },
            ]}
          /></div>
        </div>
      </main>
    </div>
  );
};
export default RegistroCompra;
