import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { actualizarMarca, agregarMarca } from "@/services/MarcasService";

const BrandTable = ({
    brandData,
    openDelete,
    setSelectedBrand,
    refreshBrands
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBrand, setFilteredBrand] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [newBrandName, setNewBrandName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const inputRef = useRef(null);
    const newInputRef = useRef(null);

    useEffect(() => {
        const filtered = brandData.filter(brand => 
            brand.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBrand(filtered);
    }, [brandData, searchTerm]);

    useEffect(() => {
        if (editingId && inputRef.current) inputRef.current.focus();
        if (isCreating && newInputRef.current) newInputRef.current.focus();
    }, [editingId, isCreating]);

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleEditClick = (brand) => {
        setEditingId(brand.ID_Marca);
        setEditedName(brand.Nombre);
    };

    const handleSaveClick = async (brand) => {
        if (!editedName.trim()) {
            setError("El nombre no puede estar vacío");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const updatedBrand = {
                ID_Marca: brand.ID_Marca,
                Nombre: editedName,
                Estado: 1
            };
            const success = await actualizarMarca(updatedBrand);
            if (success) {
                refreshBrands();
                setEditingId(null);
            } else {
                setError("Error al actualizar la marca");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelClick = () => {
        setEditingId(null);
        setEditedName("");
        setError(null);
    };

    const handleAddClick = () => {
        setIsCreating(true);
        setNewBrandName("");
        setError(null);
    };

    const handleCreateSave = async () => {
        if (!newBrandName.trim()) {
            setError("El nombre no puede estar vacío");
            return;
        }
        setIsLoading(true);
        try {
            const newBrand = {
                Nombre: newBrandName,
                Estado: 1
            };
            const success = await agregarMarca(newBrand);
            if (success) {
                refreshBrands();
                setIsCreating(false);
                setNewBrandName("");
            } else {
                setError("Error al crear la marca");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCancel = () => {
        setIsCreating(false);
        setNewBrandName("");
        setError(null);
    };

    return (
        <motion.div
            className="bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-blue-700">Marcas</h2>
                <div className="flex items-center space-x-4">
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg flex items-center disabled:opacity-50"
                        onClick={handleAddClick}
                        disabled={isCreating || isLoading}
                    >
                        <Plus className="mr-2" size={18} />
                        Agregar
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar marcas..."
                            className="bg-blue-50 text-blue-900 placeholder-blue-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
                            disabled={isLoading}
                        />
                        <Search className="absolute left-3 top-2.5 text-blue-400" size={18} />
                    </div>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-100">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                        {isLoading && (
                            <tr>
                                <td colSpan="2" className="px-6 py-4 text-center">
                                    Cargando...
                                </td>
                            </tr>
                        )}

                        {isCreating && (
                            <tr className="bg-blue-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        ref={newInputRef}
                                        type="text"
                                        value={newBrandName}
                                        onChange={(e) => setNewBrandName(e.target.value)}
                                        className="w-full bg-transparent border rounded-md px-2 py-1 text-blue-900 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={isLoading}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                                    <button
                                        className="text-green-700 hover:text-green-500 mr-2 disabled:opacity-50"
                                        onClick={handleCreateSave}
                                        disabled={isLoading}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        className="text-yellow-700 hover:text-yellow-500 disabled:opacity-50"
                                        onClick={handleCreateCancel}
                                        disabled={isLoading}
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        )}

                        {filteredBrand.length === 0 && !isCreating && !isLoading && (
                            <tr>
                                <td colSpan="2" className="px-6 py-4 text-center text-blue-400">
                                    No se encontraron marcas
                                </td>
                            </tr>
                        )}

                        {filteredBrand.map((brand) => {
                            const isEditing = editingId === brand.ID_Marca;
                            return (
                                <motion.tr
                                    key={brand.ID_Marca}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="hover:bg-blue-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            ref={isEditing ? inputRef : null}
                                            type="text"
                                            value={isEditing ? editedName : brand.Nombre}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            disabled={!isEditing || isLoading}
                                            className={`w-full bg-transparent border rounded-md px-2 py-1 text-blue-900 ${
                                                isEditing
                                                    ? "border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    : "border-transparent"
                                            }`}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    className="text-green-700 hover:text-green-500 mr-2 disabled:opacity-50"
                                                    onClick={() => handleSaveClick(brand)}
                                                    disabled={isLoading}
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    className="text-yellow-700 hover:text-yellow-500 disabled:opacity-50"
                                                    onClick={handleCancelClick}
                                                    disabled={isLoading}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="text-indigo-700 hover:text-indigo-500 mr-2 disabled:opacity-50"
                                                    onClick={() => handleEditClick(brand)}
                                                    disabled={isLoading || isCreating}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-700 hover:text-red-500 disabled:opacity-50"
                                                    onClick={() => {
                                                        setSelectedBrand(brand);
                                                        openDelete();
                                                    }}
                                                    disabled={isLoading || isCreating}
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

export default BrandTable;