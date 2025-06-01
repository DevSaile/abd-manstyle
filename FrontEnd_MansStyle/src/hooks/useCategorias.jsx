import { useEffect, useState } from "react";
import { obtenerCategoriasActivas } from "../services/CategoriasService";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState(["Todos"]);

  useEffect(() => {
    obtenerCategoriasActivas().then((data) => {
      const opciones = data.map((categoria) => categoria.Nombre);
      setCategorias(["Todos", ...opciones]);
    });
  }, []);

  return categorias;
};