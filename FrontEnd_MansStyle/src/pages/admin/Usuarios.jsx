import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import UsersTable from "../../components/usuarios/TablaUsuarios";
import ManageUser from "../../components/usuarios/EditarUsuarios";
import DeleteModal from "../../components/usuarios/EliminarUsuario";

const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
};

const userData = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Customer",
        status: "Active",
        cedula: "123456789",
        edad: 30,
        fechaDeNacimiento: "1993-05-15",
        nombreDeUsuario: "johndoe",
        contraseña: "password123",
        sucursal: "Sucursal 1",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Admin",
        status: "Active",
        cedula: "987654321",
        edad: 28,
        fechaDeNacimiento: "1995-02-20",
        nombreDeUsuario: "janesmith",
        contraseña: "securepass",
        sucursal: "Sucursal 2",
    },
];
import { obtenerEmpleadosActivos, eliminarEmpleado } from "../../services/UsuariosService";

const UsersPage = () => {

    // Estado para manejar los datos de los usuarios y el usuario seleccionado
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    // Cargar usuarios desde la API
    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {

        const empleadosActivos = await obtenerEmpleadosActivos();

        const usuariosTransformados = empleadosActivos.map((empleado) => ({
            id: empleado.ID_Empleado, // Asegúrate de que el ID esté incluido
            idSucursal: empleado.ID_Sucursal,
            idRol: empleado.ID_Rol,
            name: empleado.Nombre,
            email: empleado.correo, // Ajusta según tu modelo
            nombreDeUsuario: empleado.usuario || "Sin usuario",
            contraseña: empleado.contrasena || "Sin contraseña",
            fechaDeNacimiento: empleado.Edad || "Sin fecha",
            edad: empleado.Edad ? new Date().getFullYear() - new Date(empleado.Edad).getFullYear() : "N/A",
            role: empleado.NombreRol,
            sucursal: empleado.NombreSucursal,
            cedula: empleado.Cedula,
        }));

        setUserData(usuariosTransformados);

    };

    // Eliminar usuario (cambiar estado a inactivo)
    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        const empleadoEliminado = {
            ID_Empleado: selectedUser.id,
            Estado: 0, // Cambiar a inactivo
        };

        const resultado = await eliminarEmpleado(empleadoEliminado);

        if (resultado) {
            alert("Usuario eliminado correctamente.");
            setOpenDelete(false);
            cargarUsuarios(); // Refrescar lista de usuarios
        } else {
            alert("Error al eliminar usuario.");
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Gestión de Usuarios" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Tabla de Usuarios */}
                <UsersTable
                    userData={userData}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    openEdit={() => setOpenEdit(true)}
                    openCreate={() => setOpenCreate(true)}
                    openDelete={() => setOpenDelete(true)}
                />

                {/* Modal para Editar Usuario */}
                <ManageUser
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    userData={selectedUser}
                    onRefresh={cargarUsuarios}
                />

                {/* Modal para Crear Usuario */}
                <ManageUser
                    open={openCreate}
                    onClose={() => setOpenCreate(false)}
                    onRefresh={cargarUsuarios}
                />

                {/* Modal para Confirmar Eliminación */}
                <DeleteModal
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    onConfirm={handleDeleteUser}
                    selectedUser={selectedUser} // Información del usuario seleccionado
                />
            </main>
        </div>
    );
};

export default UsersPage;