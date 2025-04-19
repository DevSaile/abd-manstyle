import { useState } from "react";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import CategoryTable from "../../components/categorias/TablaCategorias";
import ManageUser from "../../components/usuarios/EditarUsuarios";
import DeleteModal from "../../components/usuarios/EliminarUsuario";
import BrandTable from "../../components/categorias/TablaMarcas";
  
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
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
	const [openCreate, setOpenCreate] = useState(false);
    const [openDelete , setOpenDelete] = useState(false);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Users" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 grid grid-cols-2 gap-4">
                {/* Pass categoryData as a prop */}
                <CategoryTable
                    categoryData={categoryData}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    openEdit={() => setOpenEdit(true)}
					openCreate={() => setOpenCreate(true)}
                    openDelete={() => setOpenDelete(true)}
                />

                <BrandTable
                    brandData={brandData}
                   
                />

                

            
            </main>
        </div>
    );
};

export default CategoryPage;