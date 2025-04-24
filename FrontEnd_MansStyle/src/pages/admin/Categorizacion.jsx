import { useState } from "react";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import CategoryTable from "../../components/categorias/TablaCategorias";
import ManageUser from "../../components/usuarios/EditarUsuarios";
import DeleteModal from "../../components/common/DeleteModal";
import BrandTable from "../../components/categorias/TablaMarcas";

import {obtenerCategoriasActivas} from "../../services/CategoriasService";
import {obtenerMarcas} from "../../services/MarcasService";
  
const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
};

const categoryData = [
    {
        id: 1,
        name: "Celulares",
      
    },
    {
        id: 2,
        name: "Audifonos",
   
    },
];

const brandData = [
    {
        id: 1,
        name: "Samsung",
      
    },
    {
        id: 2,
        name: "Apple",
   
    },
];

const CategoryPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openDeleteCategory , setOpenDeleteCategory] = useState(false);
    const [openDeleteBrand, setOpenDeleteBrand] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Users" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 grid grid-cols-2 gap-4">
                {/* Pass categoryData as a prop */}
                <CategoryTable
                    categoryData={categoryData}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    
                    openDelete={() => setOpenDeleteCategory(true)}
                />

                <BrandTable
                    brandData={brandData}
                    selectedBrand={selectedBrand}
                    setSelectedbrand={setSelectedBrand}
                    openDelete={() => setOpenDeleteBrand(true)}
                    
                    
                   
                />

                <DeleteModal
                    open={openDeleteBrand}
                    onClose={() => setOpenDeleteBrand(false)}
                    ObjectName="Marca"
                    ObjectProperName={selectedBrand?.name}
                />
                
                <DeleteModal
                    open={openDeleteCategory}
                    onClose={() => setOpenDeleteCategory(false)}    
                    ObjectName="Categoria"
                    ObjectProperName={selectedCategory?.name}
                    
                    
                    
                />
            
            </main>
        </div>
    );
};

export default CategoryPage;