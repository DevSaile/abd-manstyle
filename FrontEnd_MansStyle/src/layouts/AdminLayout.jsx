import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

function AdminLayout() {
    return (
        <div className='flex h-screen bg-gray-900 text-gray-100 overflow-y-auto'>
            {/* BG */}
            <div className='fixed inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
                <div className='absolute inset-0 backdrop-blur-sm' />
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;