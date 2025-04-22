import { Outlet } from "react-router-dom";
import ParticlesBackground from "../components/public/landing/ParticlesBackground";

function PublicLayout() {
    return (
        <div className='relative flex h-screen  bg-[#0f0f0f] text-gray-100'>
            <ParticlesBackground/>
            {/* Content */}
            <div className='relative z-10 flex-1'>
                <Outlet />
            </div>
        </div>
    );
}

export default PublicLayout;