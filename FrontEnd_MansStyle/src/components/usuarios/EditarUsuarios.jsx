import React, { useState, useEffect } from "react";
import { Modal } from "@rewind-ui/core";
import ComboBoxID from "../common/ComboxID";

import { obtenerSucursales } from "../../services/SucursalService";
import { obtenerRoles, agregarEmpleado, actualizarEmpleado} from "../../services/UsuariosService";

const ManageUser = ({ open, onClose, userData}) => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Cedula: "",
        Edad: "",
        FechaDeNacimiento: "",
        NombreDeUsuario: "",
        Contraseña: "",
        Sucursal: "",
        Email: "",
        Rol: "",
    });

    // Sincroniza el estado del formulario con los datos del usuario seleccionado
    useEffect(() => {
        if (userData) {
            setFormData({
                Nombre: userData.name || "",
                Cedula: userData.cedula || "",
                Edad: userData.edad || "",
                FechaDeNacimiento: userData.fechaDeNacimiento
                ? new Date(userData.fechaDeNacimiento).toISOString().split("T")[0]    : "",   // Convierte la fecha al formato YYYY-MM-DD           
                NombreDeUsuario: userData.nombreDeUsuario || "",
                Contraseña: userData.contraseña || "",
                Sucursal: userData.sucursal || "",
                Email: userData.email || "",
                Rol: userData.role || "",
            });
        }
    }, [userData]);

    // Cargar sucursales y roles al abrir el modal

    const [sucursales, setSucursales] = useState([]);
    const [roles, setRoles] = useState([]);

      // Cargar todas las categorías y sucursales al iniciar el componente
    useEffect(() => {
        Promise.all([obtenerRoles(), obtenerSucursales()]).then(
          ([RolesData, sucursalesData]) => {
            setRoles(RolesData.map(rol => ({
              label: rol.Puesto, 
              value: rol.ID_Rol
            })));
            setSucursales(sucursalesData.map(sucursal => ({
              label: sucursal.Nombre, 
              value: sucursal.ID_Sucursal
            })));
          }
        );
    }, []);

    // Actualiza el estado del formulario al cambiar los valores de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Guardar el usuario
    const handleSave = async () => {

        const nuevoEmpleado = {
            Nombre: formData.Nombre.trim(),
            Cedula: formData.Cedula.trim(),
            FechaNacimiento : formData.FechaDeNacimiento ? new Date(formData.FechaDeNacimiento).toISOString() : null,
            Usuario: formData.NombreDeUsuario?.trim() || null, // Evitar enviar null innecesario
            contrasena: formData.Contraseña?.trim() || null, // Evitar enviar null innecesario
            ID_Rol: formData.Rol ?? 0, // ✅ Permitir 0 como valor válido
            ID_Sucursal: formData.Sucursal || 1,
            correo: formData.Email.trim(),
            Estado: 1, // Activo por defecto
        };
        
        // Si es una actualización, agrega `ID_Empleado`
        if (formData.ID_Empleado) {
            nuevoEmpleado.ID_Empleado = formData.ID_Empleado;
        }
        
        // Verifica antes de enviar
        console.log("Empleado antes de enviar:", JSON.stringify(nuevoEmpleado, null, 2));
        
        const resultado = formData.ID_Empleado ? await actualizarEmpleado(nuevoEmpleado) : await agregarEmpleado(nuevoEmpleado);
        
        if (resultado) {
            alert(`Empleado ${formData.ID_Empleado ? "actualizado" : "agregado"} correctamente.`);
            onClose();
        } else {
            alert(`Error al ${formData.ID_Empleado ? "actualizar" : "agregar"} el empleado.`);
        }
    
        // Después de guardar o actualizar, refresca la lista en `UsersPage`
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={userData ? "Editar Usuario" : "Agregar Usuario"}
            size="lg"
            className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6"
        >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                    <input
                        type="text"
                        name="Nombre"
                        value={formData.Nombre}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Cédula */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Cédula</label>
                    <input
                        type="text"
                        name="Cedula"
                        value={formData.Cedula}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Edad */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Edad</label>
                    <input
                        type="number"
                        name="Edad"
                        value={formData.Edad}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="FechaDeNacimiento"
                        value={formData.FechaDeNacimiento}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>


                {/* Nombre de Usuario */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nombre de Usuario</label>
                    <input
                        type="text"
                        name="NombreDeUsuario"
                        value={formData.NombreDeUsuario}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="Contraseña"
                        value={formData.Contraseña}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Sucursal */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Sucursal</label>
                    <ComboBoxID
                        name="Sucursal"
                        options={sucursales}
                        selected={{
                            label: sucursales.find((s) => s.value === formData.Sucursal)?.label || "",
                            value: formData.Sucursal,
                        }}
                        onSelect={(sucursal) =>
                            setFormData((prev) => ({ ...prev, Sucursal: sucursal.value }))
                        }
                    />

                </div>

                {/* ROLES */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Rol</label>
                    <ComboBoxID
                        name="Rol"
                        options={roles}
                        selected={{
                            label: roles.find((r) => r.value === formData.Rol)?.label || "",
                            value: formData.Rol,
                        }}
                        onSelect={(rol) =>
                            setFormData((prev) => ({ ...prev, Rol: rol.value })) // 👈 usamos el ID directamente
                        }
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 mb-4 col-span-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 text-gray-100 hover:bg-blue-500 px-6 py-2 rounded-lg transition duration-200"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ManageUser;
