
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const handleToggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };
  
  // Only show the main sidebar on the home page
  const shouldShowMainSidebar = location.pathname === "/" || location.pathname === "/data";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1">
        {shouldShowMainSidebar && (
          <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} />
        )}
        <main className="flex-1 p-3 md:p-4 lg:p-6 transition-all duration-200 overflow-auto"
              style={{ marginLeft: sidebarOpen && shouldShowMainSidebar ? "" : "0" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
