import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">

      {/* Sidebar */}
      <div className="hidden md:block fixed w-64 h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full ">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-4 mt-8 ">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="p-4 md:ml-64">
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;