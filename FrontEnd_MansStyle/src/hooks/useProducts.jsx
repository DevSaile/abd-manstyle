import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/ProductosService'; // Asegúrate de que esta ruta sea correcta
const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await obtenerProductos();
      setProductos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return { productos, loading, error, recargar: cargarProductos };
};

export default useProductos;
