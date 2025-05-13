
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { VenteSearchSidebar } from "@/components/vente/VenteSearchSidebar";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const handleToggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };
  
  // Only show the main sidebar on the home page
  const shouldShowMainSidebar = location.pathname === "/" || location.pathname === "/data";
  
  // Show the vente sidebar only on the vente page
  const shouldShowVenteSidebar = location.pathname === "/vente";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1">
        {shouldShowMainSidebar && (
          <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} />
        )}
        {shouldShowVenteSidebar && (
          <VenteSearchSidebar 
            open={sidebarOpen} 
            onToggle={handleToggleSidebar}
            onSearch={(params) => console.log("Search params:", params)} 
          />
        )}
        <main className="flex-1 transition-all duration-200 overflow-auto"
              style={{ marginLeft: sidebarOpen && (shouldShowMainSidebar || shouldShowVenteSidebar) ? "" : "0" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
