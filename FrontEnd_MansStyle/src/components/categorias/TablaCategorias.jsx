import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { useToast } from "@rewind-ui/core";
import { actualizarCategoria, eliminarCategoria, agregarCategoria } from "../../services/CategoriasService";

const CategoryTable = ({
    categoryData,
    openEdit,
    openDelete,
    openCreate, // This can be removed if not needed
    selectedCategory,
    setSelectedCategory,
    refreshCategories // Función para refrescar las categorías después de una operación CRUD
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const inputRef = useRef(null);
    const newInputRef = useRef(null);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
        }
        if (isCreating && newInputRef.current) {
            newInputRef.current.focus();
        }
    }, [editingId, isCreating]);

    useEffect(() => {
        setFilteredCategory(categoryData);
    }, [categoryData]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = categoryData.filter((category) =>
            category.Nombre.toLowerCase().includes(term)
        );
        setFilteredCategory(filtered);
    };

    const handleEditClick = (category) => {
        setEditingId(category.ID_Categoria);
        setEditedName(category.Nombre);
    };

    const handleSaveClick = async (category) => {
        const updatedCategory = {
            ID_Categoria: category.ID_Categoria,
            Nombre: editedName,
            Estado: 1 // Asumiendo que 1 es el estado activo
        };

        const result = await actualizarCategoria(updatedCategory);
        if (result) {
            refreshCategories(); // Refrescar las categorías después de la actualización
            setEditingId(null);
        } else {
            alert("Error al actualizar la categoría");
        }
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditedName("");
    };

    const handleAddClick = () => {
        setIsCreating(true);
        setNewCategoryName("");
    };

    const handleCreateSave = async () => {
        if (!newCategoryName.trim()) return;

        const newCategory = {
            Nombre: newCategoryName,
            Estado: 1 // Asumiendo que 1 es el estado activo
        };

        const result = await agregarCategoria(newCategory);
        if (result) {
            refreshCategories(); // Refrescar las categorías después de la creación
            setIsCreating(false);
            setNewCategoryName("");
        } else {
            alert("Error al agregar la categoría");
        }
    };

    const handleCreateCancel = () => {
        setIsCreating(false);
        setNewCategoryName("");
    };


    const toast = useToast();

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Categorías</h2>
                <div className="flex items-center space-x-4">
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg flex items-center"
                        onClick={handleAddClick}
                        disabled={isCreating}
                    >
                        <Plus className="mr-2" size={18} />
                        Agregar
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar categorías..."
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
                        {isCreating && (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        ref={newInputRef}
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        className="w-full bg-transparent border rounded-md px-2 py-1 text-white border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <button
                                        className="text-green-400 hover:text-green-300 mr-2"
                                        onClick={handleCreateSave}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        className="text-yellow-400 hover:text-yellow-300"
                                        onClick={handleCreateCancel}
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        )}
                        {filteredCategory.map((category) => {
                            const isEditing = editingId === category.ID_Categoria;
                            return (
                                <motion.tr
                                    key={category.ID_Categoria}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            ref={isEditing ? inputRef : null}
                                            type="text"
                                            value={isEditing ? editedName : category.Nombre}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full bg-transparent border rounded-md px-2 py-1 text-white ${
                                                isEditing
                                                    ? "border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    : "border-transparent"
                                            }`}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    className="text-green-400 hover:text-green-300 mr-2"
                                                    onClick={() => handleSaveClick(category)}
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    className="text-yellow-400 hover:text-yellow-300"
                                                    onClick={handleCancelClick}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                                                    onClick={() => handleEditClick(category)}
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
                                            </>
                                        )}
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default CategoryTable;
