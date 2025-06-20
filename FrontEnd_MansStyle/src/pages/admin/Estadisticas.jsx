import OverviewCards from "@/components/estadisticas/OverviewCards";
import RevenueChart from "@/components/estadisticas/RevenueChart";
import ChannelPerformance from "@/components/estadisticas/ChannelPerformance";
import ProductPerformance from "@/components/estadisticas/ProductPerformance";
import UserRetention from "@/components/estadisticas/UserRetention";
import CustomerSegmentation from "@/components/estadisticas/CustomerSegmentation";
import AIPoweredInsights from "@/components/estadisticas/AIPoweredInsights";
import { useOutletContext } from "react-router-dom";

const Estadisticas = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <OverviewCards />
        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChannelPerformance />
          <ProductPerformance />
          <UserRetention />
          <CustomerSegmentation />
        </div>

        <AIPoweredInsights />
      </main>
    </div>
  );
};
export default Estadisticas;
