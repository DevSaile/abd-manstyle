import React, { useState, useEffect } from "react";
import { Drawer } from "@rewind-ui/core";
import ComboBoxID from "../common/ComboxID";
import { obtenerSucursales } from "../../services/SucursalService";
import { obtenerRoles, agregarEmpleado, actualizarEmpleado, obtenerEmpleadosActivos } from "../../services/UsuariosService";

const ManageUser = ({ open, onClose, userData, OnUserComplete }) => {
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
    const [usuariosExistentes, setUsuariosExistentes] = useState([]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [touchedFields, setTouchedFields] = useState({});
    const [erroresDuplicados, setErroresDuplicados] = useState({});

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
        setInvalidFields([]);
        setTouchedFields({});
        setErroresDuplicados({});
    }, [userData, open]);

    const formatDateForInput = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split('T')[0];
        } catch {
            return "";
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [RolesData, sucursalesData, empleadosData] = await Promise.all([
                    obtenerRoles(),
                    obtenerSucursales(),
                    obtenerEmpleadosActivos()
                ]);
                setRoles(RolesData.map(rol => ({
                    label: rol.Puesto, 
                    value: rol.ID_Rol
                })));
                setSucursales(sucursalesData.map(sucursal => ({
                    label: sucursal.Nombre, 
                    value: sucursal.ID_Sucursal
                })));
                setUsuariosExistentes(empleadosData);
            } catch (error) {
                console.error("Error cargando datos:", error);
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

    // Cálculo automático de edad
    useEffect(() => {
        if (formData.FechaDeNacimiento) {
            const nacimiento = new Date(formData.FechaDeNacimiento);
            const hoy = new Date();
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const m = hoy.getMonth() - nacimiento.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            setFormData(prev => ({ ...prev, Edad: edad }));
        }
    }, [formData.FechaDeNacimiento]);

    const handleFocus = (field) => {
        setTouchedFields(prev => ({ ...prev, [field]: false }));
        setInvalidFields(prev => prev.filter(f => f !== field));
        setErroresDuplicados(prev => ({ ...prev, [field]: false }));
    };

    const handleBlur = (field) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));

        let newInvalidFields = [...invalidFields];
        let newErroresDuplicados = { ...erroresDuplicados };

        // Requerido
        if (!formData[field]) {
            if (!newInvalidFields.includes(field)) newInvalidFields.push(field);
        } else {
            newInvalidFields = newInvalidFields.filter((f) => f !== field);
        }

        // Formato
        if (field === "Cedula") {
            const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;
            if (formData.Cedula && !cedulaRegex.test(formData.Cedula)) {
                if (!newInvalidFields.includes("Cedula")) newInvalidFields.push("Cedula");
            } else {
                newInvalidFields = newInvalidFields.filter((f) => f !== "Cedula");
            }
        }
        if (field === "Email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formData.Email && !emailRegex.test(formData.Email)) {
                if (!newInvalidFields.includes("Email")) newInvalidFields.push("Email");
            } else {
                newInvalidFields = newInvalidFields.filter((f) => f !== "Email");
            }
        }

        // Duplicados
        if (["Cedula", "Email", "NombreDeUsuario"].includes(field)) {
            let isDuplicated = false;
            usuariosExistentes.forEach((usuario) => {
                if (
                    usuario.ID_Empleado !== formData.ID_Empleado &&
                    (
                        (field === "Cedula" && usuario.Cedula === formData.Cedula) ||
                        (field === "Email" && usuario.correo === formData.Email) ||
                        (field === "NombreDeUsuario" && usuario.Usuario === formData.NombreDeUsuario)
                    )
                ) {
                    isDuplicated = true;
                }
            });
            newErroresDuplicados[field] = isDuplicated;
        }

        setInvalidFields(newInvalidFields);
        setErroresDuplicados(newErroresDuplicados);
    };

    const getTooltip = (field) => {
        if (!invalidFields.includes(field) && !erroresDuplicados[field]) return null;
        if (erroresDuplicados[field]) {
            if (field === "NombreDeUsuario") return "El nombre de usuario ya está en uso.";
            if (field === "Cedula") return "La cédula ya está en uso.";
            if (field === "Email") return "El correo ya está en uso.";
        }
        switch (field) {
            case "Nombre":
                return "El nombre es obligatorio.";
            case "Cedula":
                return "La cédula es obligatoria y debe tener el formato ###-######-####X.";
            case "Email":
                return "El correo es obligatorio y debe tener un formato válido.";
            case "NombreDeUsuario":	
                return "El nombre de usuario es obligatorio.";
            default:
                return "Campo inválido.";
        }
    };

    const isInvalid = (field) => invalidFields.includes(field) || erroresDuplicados[field];

    const handleSave = async () => {
        const newInvalidFields = [];
        const newErroresDuplicados = {};
        const newTouchedFields = {};

        // Validación de campos requeridos y formato
        if (!formData.Nombre) { newInvalidFields.push("Nombre"); newTouchedFields["Nombre"] = true; }
        if (!formData.Cedula) { newInvalidFields.push("Cedula"); newTouchedFields["Cedula"] = true; }
        if (!formData.Email) { newInvalidFields.push("Email"); newTouchedFields["Email"] = true; }
        if (!formData.NombreDeUsuario) { newInvalidFields.push("NombreDeUsuario"); newTouchedFields["NombreDeUsuario"] = true; }

        const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;
        if (formData.Cedula && !cedulaRegex.test(formData.Cedula)) { newInvalidFields.push("Cedula"); newTouchedFields["Cedula"] = true; }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.Email && !emailRegex.test(formData.Email)) { newInvalidFields.push("Email"); newTouchedFields["Email"] = true; }

        // Validación de duplicados
        usuariosExistentes.forEach((usuario) => {
            if (
                usuario.ID_Empleado !== formData.ID_Empleado &&
                usuario.Cedula === formData.Cedula
            ) {
                newErroresDuplicados["Cedula"] = true;
                newTouchedFields["Cedula"] = true;
            }
            if (
                usuario.ID_Empleado !== formData.ID_Empleado &&
                usuario.correo === formData.Email
            ) {
                newErroresDuplicados["Email"] = true;
                newTouchedFields["Email"] = true;
            }
            if (
                usuario.ID_Empleado !== formData.ID_Empleado &&
                usuario.Usuario === formData.NombreDeUsuario
            ) {
                newErroresDuplicados["NombreDeUsuario"] = true;
                newTouchedFields["NombreDeUsuario"] = true;
            }
        });

        setInvalidFields(newInvalidFields);
        setErroresDuplicados(newErroresDuplicados);
        setTouchedFields((prev) => ({ ...prev, ...newTouchedFields }));

        if (newInvalidFields.length > 0 || Object.values(newErroresDuplicados).some(Boolean)) {
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

        if (formData.ID_Empleado) {
            datosEmpleado.ID_Empleado = formData.ID_Empleado;
        }

        try {
            const resultado = formData.ID_Empleado 
                ? await actualizarEmpleado(datosEmpleado)
                : await agregarEmpleado(datosEmpleado);

            if (resultado) {
                if (OnUserComplete) OnUserComplete();
                onClose(true);
            } else {
                throw new Error("No se recibió respuesta del servidor");
            }
        } catch (error) {
            console.error("Error al guardar empleado:", error);
            alert(`Error al ${formData.ID_Empleado ? "actualizar" : "crear"} el usuario`);
        }
    };

    return (
        <Drawer
            open={open}
            onClose={() => onClose(false)}
            position="right"
            size="xl"
            className="bg-white text-blue-900 border-l border-blue-400 shadow-2xl"
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-4 border-b border-blue-200 bg-white">
                    <h2 className="text-xl font-semibold">
                        {userData ? "Editar Usuario" : "Agregar Usuario"}
                    </h2>
                    <button
                        onClick={() => onClose(false)}
                        className="text-blue-400 hover:text-blue-700 text-2xl font-bold"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>
                <form className="flex-1 overflow-y-auto px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 bg-white">
                    {/* Nombre */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-blue-900 mb-1">Nombre*</label>
                        <input
                            type="text"
                            name="Nombre"
                            value={formData.Nombre}
                            onChange={handleChange}
                            onFocus={() => handleFocus("Nombre")}
                            onBlur={() => handleBlur("Nombre")}
                            className={`w-full bg-white text-blue-900 rounded-lg px-4 py-2 transition-colors duration-200 border border-blue-500
                                ${isInvalid("Nombre") ? "border-2 border-red-500" : ""}
                                focus:border-blue-500`}
                            required
                            placeholder="..."
                        />
                        {isInvalid("Nombre") && touchedFields["Nombre"] && (
                            <div className="absolute left-0 mt-1 bg-red-600 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                                {getTooltip("Nombre")}
                            </div>
                        )}
                    </div>

                    {/* Cedula */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-blue-900 mb-1">Cédula*</label>
                        <input
                            type="text"
                            name="Cedula"
                            value={formData.Cedula}
                            onChange={handleChange}
                            onFocus={() => handleFocus("Cedula")}
                            onBlur={() => handleBlur("Cedula")}
                            className={`w-full bg-white text-blue-900 rounded-lg px-4 py-2 transition-colors duration-200 border border-blue-500
                                ${isInvalid("Cedula") ? "border-2 border-red-500" : ""}
                                focus:border-blue-500`}
                            placeholder="###-######-####X"
                            required
                        />
                        {isInvalid("Cedula") && touchedFields["Cedula"] && (
                            <div className="absolute left-0 mt-1 bg-red-600 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                                {getTooltip("Cedula")}
                            </div>
                        )}
                    </div>

                    {/* Edad */}
                    <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">Edad</label>
                        <input
                            type="number"
                            name="Edad"
                            value={formData.Edad}
                            readOnly
                            
                            className="w-full bg-blue-50 text-blue-900 rounded-lg px-4 py-2 border border-blue-500"
                        />
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="FechaDeNacimiento"
                            value={formData.FechaDeNacimiento}
                            onChange={handleChange}
                            className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border  border-blue-500"
                        />
                    </div>

                    {/* Nombre de Usuario */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-blue-900 mb-1">Nombre de Usuario</label>
                        <input
                            type="text"
                            name="NombreDeUsuario"
                            value={formData.NombreDeUsuario}
                            onChange={handleChange}
                            onFocus={() => handleFocus("NombreDeUsuario")}
                            onBlur={() => handleBlur("NombreDeUsuario")}
                            className={`w-full bg-white text-blue-900 rounded-lg px-4 py-2 transition-colors duration-200 border  border-blue-500
                                ${isInvalid("NombreDeUsuario") ? "border-2 border-red-500" : ""}
                                focus:border-blue-500`}
                            placeholder="ej: usuario123"
                        />
                        {isInvalid("NombreDeUsuario") && touchedFields["NombreDeUsuario"] && (
                            <div className="absolute left-0 mt-1 bg-red-600 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                                {getTooltip("NombreDeUsuario")}
                            </div>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="Contraseña"
                            placeholder="********"
                            value={formData.Contraseña}
                            onChange={handleChange}
                            className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 border  border-blue-500"
                        />
                    </div>

                    {/* Sucursal */}
                    <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">Sucursal</label>
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
                            className="w-full bg-white text-blue-900 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dropdownClassName="bg-white border border-blue-200 rounded-lg"
                            optionClassName="hover:bg-blue-100 text-blue-900"
                            inputClassName="bg-white text-blue-900"
                        />
                    </div>

                    {/* Rol */}
                    <div>
                        <label className="block text-sm font-medium text-blue-900 mb-1">Rol</label>
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
                            className="w-full bg-white text-blue-900 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dropdownClassName="bg-white border border-blue-200 rounded-lg"
                            optionClassName="hover:bg-blue-100 text-blue-900"
                            inputClassName="bg-white text-blue-900"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-blue-900 mb-1">Email*</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            onFocus={() => handleFocus("Email")}
                            onBlur={() => handleBlur("Email")}
                            className={`w-full bg-white text-blue-900 rounded-lg px-4 py-2 transition-colors duration-200 border  border-blue-500
                                ${isInvalid("Email") ? "border-2 border-red-500" : ""}
                                focus:border-blue-500`}
                            required
                            placeholder="nombre@email.com"
                        />
                        {isInvalid("Email") && touchedFields["Email"] && (
                            <div className="absolute left-0 mt-1 bg-red-600 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                                {getTooltip("Email")}
                            </div>
                        )}
                    </div>
                </form>
                <div className="flex justify-end gap-4 px-6 py-4 border-t border-blue-200 bg-white">
                    <button
                        type="button"
                        onClick={() => onClose(false)}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-lg transition duration-200 border border-blue-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-2 rounded-lg transition duration-200"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </Drawer>
    );
};

export default ManageUser;