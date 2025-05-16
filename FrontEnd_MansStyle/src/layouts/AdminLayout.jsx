import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Push a new history entry to prevent going back
    window.history.pushState(null, null, window.location.href);

    const handlePopState = () => {
      // Prevent going back by pushing the same state again
      window.history.pushState(null, null, window.location.href);
    };

    // Listen for the popstate event
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gray-800 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;