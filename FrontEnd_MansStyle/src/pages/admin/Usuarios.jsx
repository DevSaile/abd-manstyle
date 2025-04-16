import Header from "../../components/common/Header";

import OverviewCards from "../../components/usuarios/OverviewCards";
import RevenueChart from "../../components/usuarios/RevenueChart";
import ChannelPerformance from "../../components/usuarios/ChannelPerformance";
import ProductPerformance from "../../components/usuarios/ProductPerformance";
import UserRetention from "../../components/usuarios/UserRetention";
import CustomerSegmentation from "../../components/usuarios/CustomerSegmentation";
import AIPoweredInsights from "../../components/usuarios/AIPoweredInsights";

const UsersPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
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
export default UsersPage;
