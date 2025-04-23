
import { Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";

import LandingPage from "./pages/public/Landing";
import OverviewPage from "./pages/admin/PanelInicial";
import ProductsPage from "./pages/admin/Productos";
import ClientsPage from "./pages/admin/Clientes";
import CashierPage from "./pages/admin/Ventas";
import UsersPage from "./pages/admin/Usuarios";
import CategoryPage from "./pages/admin/Categorizacion";
import RegistrosVenta from "./pages/admin/RegistrosVentas";
import RegistroCompra from "./pages/admin/RegistrosCompra";

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path='/' element={<LandingPage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
                <Route path='/inicio' element={<OverviewPage />} />

                <Route path='/productos' element={<ProductsPage />} />
                <Route path='/clientes' element={<ClientsPage />} />
                <Route path='/venta' element={<CashierPage />} />
                <Route path='/registrosventas' element={<RegistrosVenta />} />
                <Route path='/registroscompras' element={<RegistroCompra />} />
                <Route path='/usuarios' element={<UsersPage />} />
                <Route path='/categorias' element={<CategoryPage />} />
            </Route>
        </Routes>
    );
}

export default App;
