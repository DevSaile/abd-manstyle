import { Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout, PublicLayout } from "./layouts";
import {
  BuyingPage,
  OverviewPage,
  ProductsPage,
  ClientsPage,
  CashierPage,
  UsersPage,
  CategoryPage,
  RegistrosVenta,
  RegistroCompra
} from "./pages/admin";
import {
  LandingPage,
  Login,
  RecoverPassword,
  ResetPassword,
  Error404
} from "./pages/public";
import { ProtectedRoute } from "./components/public/auth";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecoverPassword />} />
        <Route path="/resetear-contrasena/:token" element={<ResetPassword />} />
      </Route>

      {/* Rutas del panel admin bajo /admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="inicio" element={<OverviewPage />} />
        <Route
          path="productos"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="clientes"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="venta"
          element={
            <ProtectedRoute>
              <CashierPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="registrosventas"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <RegistrosVenta />
            </ProtectedRoute>
          }
        />
        <Route
          path="registroscompras"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <RegistroCompra />
            </ProtectedRoute>
          }
        />
        <Route
          path="compra"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <BuyingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="categorias"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="usuarios"
          element={
            <ProtectedRoute requiredRole="Administrador">
              <UsersPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Ruta de error 404 */}
      <Route path="/404" element={<Error404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
