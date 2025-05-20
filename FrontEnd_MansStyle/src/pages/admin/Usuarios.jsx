import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import UsersTable from "../../components/usuarios/TablaUsuarios";
import ManageUser from "../../components/usuarios/EditarUsuarios";
import DeleteModal from "../../components/usuarios/EliminarUsuario";
import { obtenerEmpleadosActivos, eliminarEmpleado } from "../../services/UsuariosService";
import { ShowToast } from "../../components/common/ShowToast";

const UsersPage = () => {
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [OpenToastEdit, setOpenToastEdit] = useState(false);
    const [OpenToastCreate, setOpenToastCreate] = useState(false);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const empleadosActivos = await obtenerEmpleadosActivos();
            
            const usuariosTransformados = empleadosActivos.map(empleado => ({
                ID_Empleado: empleado.ID_Empleado,
                Nombre: empleado.Nombre,
                Cedula: empleado.Cedula,
                Edad: empleado.FechaNacimiento ? 
                    new Date().getFullYear() - new Date(empleado.FechaNacimiento).getFullYear() : "",
                FechaNacimiento: empleado.FechaNacimiento ? formatDateForInput(empleado.FechaNacimiento) : "",
                Usuario: empleado.usuario || "",
                contrasena: empleado.contrasena || "",
                ID_Sucursal: empleado.ID_Sucursal,
                correo: empleado.correo,
                ID_Rol: empleado.ID_Rol,
                // Para mostrar en la tabla
                NombreRol: empleado.NombreRol,
                NombreSucursal: empleado.NombreSucursal
            }));

            setUserData(usuariosTransformados);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
            alert("Error al cargar los usuarios");
        }

        console.log("Usuarios cargados:", userData);
    };

    const formatDateForInput = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split('T')[0];
        } catch {
            return "";
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser({
            ...user,
            NombreDeUsuario: user.Usuario,
            Contraseña: user.contrasena
        });
        setOpenEdit(true);
    };

    // En tu componente UsersPage
    const handleDeleteUser = async () => {

        if (!selectedUser) return;
    
        try {
        const resultado = await eliminarEmpleado({
            ID_Empleado: selectedUser.ID_Empleado,
            Estado: 0 // Cambiar a inactivo
        });
    
        if (resultado) {
            alert("Usuario eliminado correctamente");
            cargarUsuarios(); // Refrescar la lista
        } else {
            throw new Error("No se recibió confirmación");
        }
        } catch (error) {
        console.error("Error eliminando usuario:", error);
        alert("Error al eliminar usuario");
        }

    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Gestión de Usuarios" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <UsersTable
                    userData={userData}
                    onEditClick={handleEditUser}
                    onDeleteClick={(user) => {
                        setSelectedUser(user);
                        setOpenDelete(true);
                    }}
                    onCreateClick={() => setOpenCreate(true)}
                />

                 <ManageUser
                    open={openEdit}
                    onClose={(success) => {
                        setOpenEdit(false);
                        if (success) cargarUsuarios();
                    }}
                    userData={selectedUser}
                    OnUserComplete={() => {setOpenToastEdit(true)}}
                />

                <ManageUser
                    open={openCreate}
                    onClose={(success) => {
                        setOpenCreate(false);
                        if (success) cargarUsuarios();
                    }}
                    OnUserComplete={() => {setOpenToastCreate(true)}}
                />

                <DeleteModal
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    onConfirm={handleDeleteUser}
                    selectedUser={selectedUser}
                />

                <ShowToast
                    show={OpenToastEdit}
                    onClose={() => setOpenToastEdit(false)}
                    message="Usuario editado correctamente"
                    type="success"
                />

                <ShowToast
                    show={OpenToastCreate}
                    onClose={() => setOpenToastCreate(false)}
                    message="Usuario creado correctamente"
                    type="success"
                /> 
            </main>
        </div>
    );
};

export default UsersPage;