
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
        <main className="flex-1 p-4 md:p-6 transition-all duration-200"
              style={{ marginLeft: sidebarOpen ? "" : "0" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
