import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";

const UsersTable = ({ 
    userData, 
    onEditClick, 
    onDeleteClick, 
    onCreateClick 
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Filtrado de usuarios
    useEffect(() => {
        if (!userData) return;
        
        const filtered = userData.filter(user => 
            user.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.Usuario && user.Usuario.toLowerCase().includes(searchTerm.toLowerCase())) ||
            user.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Cedula.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [userData, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Usuarios</h2>
                <div className="flex items-center space-x-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                        onClick={onCreateClick}
                    >
                        <Plus className="mr-2" size={18} />
                        Agregar
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar usuarios..."
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
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
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Correo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Cédula
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Fecha de Nacimiento / Edad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Rol
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <motion.tr
                                    key={user.ID_Empleado}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="hover:bg-gray-700/50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                                                    {user.Nombre.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-100">
                                                    {user.Nombre}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {user.NombreSucursal}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">
                                            {user.Usuario || "N/A"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">
                                            {user.correo}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">
                                            {user.Cedula}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">
                                            {user.FechaNacimiento} / {user.Edad }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.ID_Rol === 1 ? 'bg-green-900 text-green-100' : 
                                            user.ID_Rol === 2 ? 'bg-blue-900 text-blue-100' : 
                                            'bg-purple-900 text-purple-100'
                                        }`}>
                                            {user.NombreRol}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            className="text-indigo-400 hover:text-indigo-300 mr-4"
                                            onClick={() => onEditClick(user)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="text-red-400 hover:text-red-300"
                                            onClick={() => onDeleteClick(user)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                                    {searchTerm ? "No se encontraron usuarios" : "Cargando usuarios..."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UsersTable;