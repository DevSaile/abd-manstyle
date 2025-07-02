import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";

const UsersTable = ({
  userData,
  onEditClick,
  onDeleteClick,
  onCreateClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!userData) return;
    const filtered = userData.filter(
      (user) =>
        user.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.Usuario &&
          user.Usuario.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Cedula.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [userData, searchTerm]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <motion.div
      className="bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-700">Usuarios</h2>
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
            onClick={onCreateClick}
          >
            <Plus className="mr-2" size={18} />
            Agregar
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="bg-blue-50 text-blue-900 placeholder-blue-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search
              className="absolute left-3 top-2.5 text-blue-400"
              size={18}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Correo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Cédula
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Fecha de Nacimiento / Edad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <motion.tr
                  key={user.ID_Empleado}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-blue-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {user.Nombre.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-blue-900">
                          {user.Nombre}
                        </div>
                        <div className="text-xs text-blue-400">
                          {user.NombreSucursal}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-700">
                      {user.Usuario || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-700">{user.correo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-700">{user.Cedula}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-700">
                      {user.FechaNacimiento} / {user.Edad}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.ID_Rol === 1
                          ? "bg-green-100 text-green-700"
                          : user.ID_Rol === 2
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {user.NombreRol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 mr-4"
                      onClick={() => onEditClick(user)}
                    >
                      Editar
                    </button>
                    {user.NombreRol !== "Administrador" && (
                      <>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => onDeleteClick(user)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-blue-400">
                  {searchTerm
                    ? "No se encontraron usuarios"
                    : "Cargando usuarios..."}
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
