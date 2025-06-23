import { useState, useEffect } from "react";
import CategoryTable from "@/components/categorias/TablaCategorias";
import DeleteModal from "@/components/common/DeleteModal";
import BrandTable from "@/components/categorias/TablaMarcas";
import { useOutletContext } from "react-router-dom";

import {
  obtenerCategoriasActivas,
  eliminarCategoria,
} from "@/services/CategoriasService";
import { eliminarMarca, obtenerMarcas } from "@/services/MarcasService";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [openDeleteBrand, setOpenDeleteBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
    const { setTitle } = useOutletContext();
    useEffect(() => {
      setTitle("Categorizacion");
    }, [setTitle]);

  useEffect(() => {
    // Cargar categorías activas
    obtenerCategoriasActivas()
      .then((data) => {
        console.log("Categorías activas:", data); // Debugging line
        setCategoryData(data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías activas:", error);
      });

    // Cargar marcas
    obtenerMarcas()
      .then((data) => {
        console.log("Marcas:", data); // Debugging line
        setBrandData(data);
      })
      .catch((error) => {
        console.error("Error al obtener marcas:", error);
      });
  }, []);

  const refreshCategories = async () => {
    // Cargar categorías activas
    obtenerCategoriasActivas()
      .then((data) => {
        console.log("Categorías activas:", data); // Debugging line
        setCategoryData(data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías activas:", error);
      });
  };

  const refreshBrands = async () => {
    // Cargar marcas
    obtenerMarcas()
      .then((data) => {
        console.log("Marcas:", data); // Debugging line
        setBrandData(data);
      })
      .catch((error) => {
        console.error("Error al obtener marcas:", error);
      });
  };
  const handleDeleteBrand = async () => {
    if (!selectedBrand) return;

    const deletedMarca = {
      ID_Marca: selectedBrand.ID_Marca,
      Estado: 0, // Asumiendo que 0 es el estado inactivo
    };

    const result = await eliminarMarca(deletedMarca);
    if (result) {
      refreshBrands(); // Refrescar las categorías después de la eliminación
      setSelectedBrand(null);
      openDelete(false); // Cerrar el modal de eliminación
    } else {
      alert("Error al eliminar la marca");
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    const deletedCategory = {
      ID_Categoria: selectedCategory.ID_Categoria,
      Estado: 0, // Asumiendo que 0 es el estado inactivo
    };

    const result = await eliminarCategoria(deletedCategory);
    if (result) {
      refreshCategories(); // Refrescar las categorías después de la eliminación
      setSelectedCategory(null);
      openDelete(false); // Cerrar el modal de eliminación
    } else {
      alert("Error al eliminar la categoría");
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 grid grid-cols-2 gap-4">
        {/* Pasar categoryData como prop */}
        <CategoryTable
          categoryData={categoryData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          openDelete={() => setOpenDeleteCategory(true)}
          refreshCategories={refreshCategories} // Pasar la función de refresco
        />

        <BrandTable
          brandData={brandData}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          openDelete={() => setOpenDeleteBrand(true)}
          refreshBrands={refreshBrands} // Pasar la función de refresco
        />

        <DeleteModal
          open={openDeleteBrand}
          onClose={() => setOpenDeleteCategory(false)}
          ObjectName="Marca"
          ObjectProperName={selectedBrand?.Nombre}
          DeleteLogic={handleDeleteBrand} // Lógica de eliminación para marcas
          // Se pasa la función handleDeleteBrand como prop
        />

        <DeleteModal
          open={openDeleteCategory}
          onClose={() => setOpenDeleteCategory(false)}
          ObjectName="Categoría"
          ObjectProperName={selectedCategory?.Nombre}
          DeleteLogic={handleDeleteCategory} // Lógica de eliminación para categorías
          // Se pasa la función handleDeleteCategory como prop
        />
      </main>
    </div>
  );
};

export default CategoryPage;
