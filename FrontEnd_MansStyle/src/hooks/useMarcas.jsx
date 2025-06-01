import { useEffect, useState } from "react";
import { obtenerMarcas } from "../services/MarcasService";

export const useMarcas = () => {
  const [marcas, setMarcas] = useState(["Todos"]);

  useEffect(() => {
    obtenerMarcas().then((data) => {
      const opciones = data.map((marca) => marca.Nombre);
      setMarcas(["Todos", ...opciones]);
    });
  }, []);

  return marcas;
};