import { Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

import Landing from "./pages/public/Landing";
import OverviewPage from "./pages/admin/PanelInicial";
import ProductsPage from "./pages/admin/Productos";
import ClientsPage from "./pages/admin/Clientes";
import CashierPage from "./pages/admin/Ventas";
import RegistersPage from "./pages/admin/Registros";
import UsersPage from "./pages/admin/Usuarios";

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path='/inicio' element={<Landing />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
                <Route path='/' element={<OverviewPage />} />
                <Route path='/productos' element={<ProductsPage />} />
                <Route path='/clientes' element={<ClientsPage />} />
                <Route path='/venta' element={<CashierPage />} />
                <Route path='/registros' element={<RegistersPage />} />
                <Route path='/usuarios' element={<UsersPage />} />
            </Route>
        </Routes>
    );
}

export default App;