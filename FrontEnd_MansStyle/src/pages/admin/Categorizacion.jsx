import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import CategoryTable from "../../components/categorias/TablaCategorias";
import DeleteModal from "../../components/common/DeleteModal";
import BrandTable from "../../components/categorias/TablaMarcas";

import { obtenerCategoriasActivas } from "../../services/CategoriasService";
import { obtenerMarcas } from "../../services/MarcasService";

const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
    const [openDeleteBrand, setOpenDeleteBrand] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [brandData, setBrandData] = useState([]);

    useEffect(() => {
        // Cargar categorías activas
        obtenerCategoriasActivas().then((data) => {
            console.log("Categorías activas:", data); // Debugging line
            setCategoryData(data);
        }).catch(error => {
            console.error("Error al obtener categorías activas:", error);
        });

        // Cargar marcas
        obtenerMarcas().then((data) => {
            console.log("Marcas:", data); // Debugging line
            setBrandData(data);
        }).catch(error => {
            console.error("Error al obtener marcas:", error);
        });
    }, []);

    const refreshCategories = async () => {
        // Cargar categorías activas
        obtenerCategoriasActivas().then((data) => {
            console.log("Categorías activas:", data); // Debugging line
            setCategoryData(data);
        }).catch(error => {
            console.error("Error al obtener categorías activas:", error);
        });

        // Cargar marcas
        obtenerMarcas().then((data) => {
            console.log("Marcas:", data); // Debugging line
            setBrandData(data);
        }).catch(error => {
            console.error("Error al obtener marcas:", error);
        });  
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategory) return;

        const deletedCategory = {
            ID_Categoria: selectedCategory.ID_Categoria,
            Estado: 0 // Asumiendo que 0 es el estado inactivo
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
            <Header title="Categorías y Marcas" />

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
                />

                <DeleteModal
                    open={openDeleteBrand}
                    onClose={() => setOpenDeleteBrand(false)}
                    ObjectName="Marca"
                    ObjectProperName={selectedBrand?.Nombre}
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
