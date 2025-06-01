import { useEffect, useState } from "react";
import { obtenerSucursales } from "../services/SucursalService";

export const useSucursales = () => {
  const [sucursales, setSucursales] = useState(["Todos"]);

  useEffect(() => {
    obtenerSucursales().then((data) => {
      const opciones = data.map((sucursal) => sucursal.Nombre);
      setSucursales(["Todos", ...opciones]);
    });
  }, []);

  return sucursales;
};