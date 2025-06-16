import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import BuyingPage from "./pages/admin/Compras";
import LandingPage from "./pages/public/Landing";
import OverviewPage from "./pages/admin/PanelInicial";
import ProductsPage from "./pages/admin/Productos";
import ClientsPage from "./pages/admin/Clientes";
import CashierPage from "./pages/admin/Ventas";
import UsersPage from "./pages/admin/Usuarios";
import CategoryPage from "./pages/admin/Categorizacion";
import RegistrosVenta from "./pages/admin/RegistrosVentas";
import RegistroCompra from "./pages/admin/RegistrosCompra";
import Login from "./pages/public/Login";
import RecoverPassword from "./pages/public/RecoverPassword";
import ResetPassword from "./pages/public/ResetPassword";
import ProtectedRoute from "./components/public/auth/ProtectedRoute";
import Error404 from "./pages/public/Error404";

function App() {
  return (
    
    <Routes>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecoverPassword />} />
        <Route path="/resetear-contrasena/:token" element={<ResetPassword />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/inicio" element={<OverviewPage />} />

        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/venta"
          element={
            <ProtectedRoute>
              <CashierPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registrosventas"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <RegistrosVenta />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registroscompras"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <RegistroCompra />
            </ProtectedRoute>
          }
        />
             <Route
          path="/compra"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <BuyingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <CategoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <UsersPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/404" element={<Error404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
