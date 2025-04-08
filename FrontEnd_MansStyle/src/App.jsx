import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import ClientsPage from "./pages/Clientes";
import BuyingPage from "./pages/Compras";
import ProductsPage from "./pages/Productos";

import OverviewPage from "./pages/PanelInicial";
import RegistersPage from "./pages/Registros";

import CashierPage from "./pages/Ventas";
import UsersPage from "./pages/Usuarios";

function App() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/productos' element={<ProductsPage/>} />
				<Route path='/compra' element={<BuyingPage />} />

				<Route path='/clientes' element={<ClientsPage/>} />
				<Route path='/venta' element={<CashierPage />} />
				<Route path='/registros' element={<RegistersPage />} />
				<Route path='/usuarios' element={<UsersPage />} />
			</Routes>
		</div>
	);
}

export default App;
