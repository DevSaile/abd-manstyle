import React, { useState, useEffect } from "react";
import { Modal } from "@rewind-ui/core";
import ComboBoxID from "../common/ComboxID";
import { obtenerSucursales } from "../../services/SucursalService";
import {
    obtenerRoles,
    obtenerEmpleadosActivos,
    agregarEmpleado,
    actualizarEmpleado,
} from "../../services/UsuariosService";

const requiredFields = [
    "Nombre",
    "Cedula",
    "Edad",
    "FechaDeNacimiento",
    "NombreDeUsuario",
    "Contraseña",
    "Sucursal",
    "Email",
    "Rol",
];


const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        ID_Empleado: null,
    });

    const [sucursales, setSucursales] = useState([]);
    const [roles, setRoles] = useState([]);
    const [usuariosExistentes, setUsuariosExistentes] = useState([]);
    const [invalidFields, setInvalidFields] = useState([]);
    const [erroresDuplicados, setErroresDuplicados] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [RolesData, sucursalesData, empleadosData] = await Promise.all([
                    obtenerRoles(),
                    obtenerSucursales(),
                    obtenerEmpleadosActivos(),
                ]);
                setRoles(RolesData.map((rol) => ({
                    label: rol.Puesto,
                    value: rol.ID_Rol,
                })));
                setSucursales(sucursalesData.map((sucursal) => ({
                    label: sucursal.Nombre,
                    value: sucursal.ID_Sucursal,
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
                Contraseña: userData.contrasena || "",
                Sucursal: userData.ID_Sucursal || "",
                Email: userData.correo || "",
                Rol: userData.ID_Rol || "",
                ID_Empleado: userData.ID_Empleado || null,
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
                ID_Empleado: null,
            });
        }
        setInvalidFields([]);
        setErroresDuplicados({});
        setTouchedFields({});
    }, [userData, open]);

    const formatDateForInput = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split("T")[0];
        } catch {
            return "";
        }
    };

    useEffect(() => {
        if (formData.FechaDeNacimiento) {
            const nacimiento = new Date(formData.FechaDeNacimiento);
            const hoy = new Date();
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const m = hoy.getMonth() - nacimiento.getMonth();
            if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            setFormData((prev) => ({ ...prev, Edad: edad }));
        }
    }, [formData.FechaDeNacimiento]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFocus = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
        setInvalidFields((prev) => prev.filter((f) => f !== field));
        setErroresDuplicados((prev) => ({ ...prev, [field]: false }));
    };

    const handleBlur = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));

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
            if (formData.Cedula && !cedulaRegex.test(formData.Cedula)) {
                if (!newInvalidFields.includes("Cedula")) newInvalidFields.push("Cedula");
            } else {
                newInvalidFields = newInvalidFields.filter((f) => f !== "Cedula");
            }
        }
        if (field === "Email") {
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
                    usuario[field] === formData[field]
                ) {
                    isDuplicated = true;
                }
                // Para correo y usuario, los nombres de campo pueden diferir
                if (
                    field === "Email" &&
                    usuario.ID_Empleado !== formData.ID_Empleado &&
                    usuario.correo === formData.Email
                ) {
                    isDuplicated = true;
                }
                if (
                    field === "NombreDeUsuario" &&
                    usuario.ID_Empleado !== formData.ID_Empleado &&
                    usuario.Usuario === formData.NombreDeUsuario
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
            return `El ${field === "NombreDeUsuario" ? "usuario" : field.toLowerCase()} ya está en uso.`;
        }
        switch (field) {
            case "Cedula":
                return "La cédula debe tener formato ###-######-####X.";
            case "Email":
                return "El correo debe tener un formato válido.";
            
        }
    };

    const isInvalid = (field) => invalidFields.includes(field) || erroresDuplicados[field];

    const handleSave = async () => {
        // Solo validación final para evitar guardar con errores
        const newInvalidFields = [];
        const newErroresDuplicados = {};

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newInvalidFields.push(field);
            }
        });

        if (formData.Cedula && !cedulaRegex.test(formData.Cedula)) {
            newInvalidFields.push("Cedula");
        }
        if (formData.Email && !emailRegex.test(formData.Email)) {
            newInvalidFields.push("Email");
        }

        usuariosExistentes.forEach((usuario) => {
            if (
                usuario.ID_Empleado !== formData.ID_Empleado &&
                usuario.Cedula === formData.Cedula
            ) {
                newErroresDuplicados["Cedula"] = true;
            }
            if (
                usuario.ID_Empleado !== formData.ID_Empleado &&
                usuario.correo === formData.Email
            ) {
                newErroresDuplicados["Email"] = true;
            }
            if (
                usuario.ID_Empleado !== formData.ID_Empleado &&
                usuario.Usuario === formData.NombreDeUsuario
            ) {
                newErroresDuplicados["NombreDeUsuario"] = true;
            }
        });

        setInvalidFields(newInvalidFields);
        setErroresDuplicados(newErroresDuplicados);

        if (newInvalidFields.length > 0 || Object.keys(newErroresDuplicados).length > 0) {
            return;
        }

        const datosEmpleado = {
            Nombre: formData.Nombre.trim(),
            Cedula: formData.Cedula.trim(),
            FechaNacimiento: formData.FechaDeNacimiento
                ? new Date(formData.FechaDeNacimiento).toISOString()
                : null,
            Usuario: formData.NombreDeUsuario.trim(),
            contrasena: formData.Contraseña,
            ID_Rol: formData.Rol || 0,
            ID_Sucursal: formData.Sucursal || 1,
            correo: formData.Email.trim(),
            Estado: 1,
        };

        if (formData.ID_Empleado) {
            datosEmpleado.ID_Empleado = formData.ID_Empleado;
        }

        try {
            const resultado = formData.ID_Empleado
                ? await actualizarEmpleado(datosEmpleado)
                : await agregarEmpleado(datosEmpleado);

            if (resultado) {
                alert(`Usuario ${formData.ID_Empleado ? "actualizado" : "creado"} correctamente`);
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
        <Modal
            open={open}
            onClose={() => onClose(false)}
            title={userData ? "Editar Usuario" : "Agregar Usuario"}
            size="lg"
            className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6"
        >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
                {[
                    { label: "Nombre*", name: "Nombre" },
                    { label: "Cédula*", name: "Cedula", placeholder: "###-######-####X" },
                    { label: "Email*", name: "Email" },
                    { label: "Nombre de Usuario*", name: "NombreDeUsuario" },
                    { label: "Contraseña*", name: "Contraseña", type: "password" },
                ].map(({ label, name, placeholder, type = "text" }) => (
                    <div className="relative" key={name}>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            {label}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            onFocus={() => handleFocus(name)}
                            onBlur={() => handleBlur(name)}
                            placeholder={placeholder}
                            className={`w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2 transition-colors duration-200 ${
                                isInvalid(name) ? "border-2 border-red-500" : ""
                            } focus:border-blue-500`}
                            required
                        />
                        {isInvalid(name) && touchedFields[name] && (
                            <div className="absolute left-0 mt-1 bg-red-600 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                                {getTooltip(name)}
                            </div>
                        )}
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Edad</label>
                    <input
                        type="number"
                        name="Edad"
                        value={formData.Edad}
                        readOnly
                        className="w-full bg-gray-600 text-gray-100 rounded-lg px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        name="FechaDeNacimiento"
                        value={formData.FechaDeNacimiento}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-100 rounded-lg px-4 py-2"
                    />
                </div>

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
                            setFormData((prev) => ({ ...prev, Rol: rol.value }))
                        }
                    />
                </div>

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