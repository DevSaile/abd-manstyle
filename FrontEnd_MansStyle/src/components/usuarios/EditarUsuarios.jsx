import React, { useState, useEffect } from "react";
import { Modal } from "@rewind-ui/core";
import ComboBox from "../common/ComboBox";

const ManageUser = ({ open, onClose, onSave, userData, sucursales }) => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Cedula: "",
        Edad: "",
        FechaDeNacimiento: "",
        NombreDeUsuario: "",
        Contraseña: "",
        Sucursal: "",
        Email: "",
    });

    // Update formData when userData changes
    useEffect(() => {
        if (userData) {
            setFormData({
                Nombre: userData.name || "",
                Cedula: userData.cedula || "",
                Edad: userData.edad || "",
                FechaDeNacimiento: userData.fechaDeNacimiento || "",
                NombreDeUsuario: userData.nombreDeUsuario || "",
                Contraseña: userData.contraseña || "",
                Sucursal: userData.sucursal || "",
                Email: userData.email || "",
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Editar Usuario"
            size="lg"
            className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6"
        >
            {/* Buttons Row */}
          

            {/* Form */}
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

                {/* Cedula */}
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
                    <ComboBox
                        name="Sucursal"
                        options={sucursales}
                        onSelect={(value) => setFormData((prev) => ({ ...prev, Sucursal: value }))}
                        enableSearchBar={true}
                        value={formData.Sucursal} // Pass the current value of Sucursal
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