import { useState } from "react";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import UsersTable from "../../components/usuarios/TablaUsuarios";
import ManageUser from "../../components/usuarios/EditarUsuarios";
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

const UsersPage = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
	const [openCreate, setOpenCreate] = useState(false);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Users" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Pass userData as a prop */}
                <UsersTable
                    userData={userData}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    openEdit={() => setOpenEdit(true)}
					openCreate={() => setOpenCreate(true)}
                />

                <ManageUser
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    userData={selectedUser}
                    sucursales={["Sucursal 1", "Sucursal 2"]}
                />

				<ManageUser
				open={openCreate}
				onClose={() => setOpenCreate(false)}
				sucursales={["Sucursal 1", "Sucursal 2"]}
				/>
            </main>
        </div>
    );
};

export default UsersPage;