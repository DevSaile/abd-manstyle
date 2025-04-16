import { Outlet } from "react-router-dom";

function PublicLayout() {
    return (
        <div className='flex h-screen bg-white text-black'>
            {/* Content */}
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
}

export default PublicLayout;