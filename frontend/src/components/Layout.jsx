import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && (
          <>
            {/* Sidebar Drawer on Mobile */}
            <div
              className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:hidden ${
                isSidebarOpen ? "block" : "hidden"
              }`}
              onClick={closeSidebar}
            />

            <div
              className={`fixed top-0 left-0 w-64 bg-base-200 border-r border-base-300 h-full z-50 transform transition-transform duration-300 lg:hidden ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar closeSidebar={closeSidebar} />
            </div>

            {/* Static Sidebar for desktop */}
            <div className="hidden lg:flex">
              <Sidebar />
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col">
          <Navbar onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
