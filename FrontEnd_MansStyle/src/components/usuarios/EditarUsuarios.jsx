import React, { useState, useEffect } from "react";
import { Modal } from "@rewind-ui/core";
import ComboBoxID from "../common/ComboxID";
import { obtenerSucursales } from "../../services/SucursalService";
import { obtenerRoles, agregarEmpleado, actualizarEmpleado } from "../../services/UsuariosService";
import { label } from "framer-motion/client";

const ManageUser = ({ open, onClose, userData }) => {
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
        ID_Empleado: null
    });

    const [sucursales, setSucursales] = useState([]);
    const [roles, setRoles] = useState([]);

    // Sincroniza el estado del formulario con los datos del usuario
    useEffect(() => {
        if (userData) {
            setFormData({
                Nombre: userData.Nombre || "",
                Cedula: userData.Cedula || "",
                Edad: userData.Edad || "",
                FechaDeNacimiento: userData.FechaNacimiento 
                    ? formatDateForInput(userData.FechaNacimiento)
                    : "",
                NombreDeUsuario: userData.Usuario || "",
                Sucursal: userData.ID_Sucursal || "",
                Email: userData.correo || "",
                Rol: userData.ID_Rol || "",
                ID_Empleado: userData.ID_Empleado || null,
                Contraseña: userData.contrasena || ""
            });
        } else {
            // Resetear formulario cuando no hay userData (nuevo usuario)
            setFormData({
                Nombre: "",
                Cedula: "",
                Edad: "",
                FechaDeNacimiento: "",
                NombreDeUsuario: "",
                Contraseña: "",
                Sucursal: "",
                Email: "",
                Rol: "",
                ID_Empleado: null
            });
        }

        console.log("Datos del formulario:", formData);
    }, [userData]);

    // Formatear fecha para input type="date"
    const formatDateForInput = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split('T')[0];
        } catch {
            return "";
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [RolesData, sucursalesData] = await Promise.all([
                    obtenerRoles(),
                    obtenerSucursales()
                ]);
                
                setRoles(RolesData.map(rol => ({
                    label: rol.Puesto, 
                    value: rol.ID_Rol
                })));
                
                setSucursales(sucursalesData.map(sucursal => ({
                    label: sucursal.Nombre, 
                    value: sucursal.ID_Sucursal
                })));
            } catch (error) {
                console.error("Error cargando datos:", error);
                // Aquí podrías mostrar un mensaje al usuario
            }
        };

        if (open) {
            cargarDatos();
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    };

    const handleSave = async () => {
        // Validaciones básicas
        if (!formData.Nombre || !formData.Cedula || !formData.Email) {
            alert("Por favor complete los campos requeridos");
            return;
        }

        const datosEmpleado = {
            Nombre: formData.Nombre.trim(),
            Cedula: formData.Cedula.trim(),
            FechaNacimiento: formData.FechaDeNacimiento 
                ? new Date(formData.FechaDeNacimiento).toISOString()
                : null,
            Usuario: formData.NombreDeUsuario.trim() || null,
            contrasena: formData.Contraseña || null,
            ID_Rol: formData.Rol || 0,
            ID_Sucursal: formData.Sucursal || 1,
            correo: formData.Email.trim(),
            Estado: 1
        };

        // Si es edición, agregar ID
        if (formData.ID_Empleado) {
            datosEmpleado.ID_Empleado = formData.ID_Empleado;
        }

        try {
            const resultado = formData.ID_Empleado 
                ? await actualizarEmpleado(datosEmpleado)
                : await agregarEmpleado(datosEmpleado);

            if (resultado) {
                alert(`Usuario ${formData.ID_Empleado ? "actualizado" : "creado"} correctamente`);
                onClose(true); // Pasar true para indicar éxito
            } else {
                throw new Error("No se recibió respuesta del servidor");
            }
        } catch (error) {
            console.error("Error al guardar empleado:", error);
            alert(`Error al ${formData.ID_Empleado ? "actualizar" : "crear"} el usuario`);
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => onClose(false)}
            title={userData ? "Editar Usuario" : "Agregar Usuario"}
            size="lg"
            className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6"
        >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
                {/* Campos del formulario (igual que antes) */}
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nombre*</label>
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">Cédula*</label>
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
                            setFormData(prev => ({ ...prev, Sucursal: sucursal.value }))
                        }
                    />
                </div>

                {/* Rol */}
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
                            setFormData(prev => ({ ...prev, Rol: rol.value }))
                        }
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email*</label>
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
                        onClick={() => onClose(false)}
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