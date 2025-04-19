import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";

const CategoryTable = ({ categoryData, openEdit, openDelete, openCerate, selectedCategory, setSelectedCategory }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategory, setFilteredCategory] = useState(categoryData); // Initialize with userData prop

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = categoryData.filter(
            (category) =>
                category.name.toLowerCase().includes(term)
        );
        setFilteredCategory(filtered);
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Categorias</h2>
                <div className="flex items-center space-x-4">
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex items-center"
                        onClick={()=> openCreate()}
                    >
                        <Plus className="mr-2" size={18} />
                        Agregar
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={18}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Nombre
                            </th>
                        
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredCategory.map((category) => (
                            <motion.tr
                                key={category.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                {category.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-100">
                                                {category.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                               
                               
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <button
                                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            openEdit();
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-300"
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            openDelete();
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default CategoryTable;