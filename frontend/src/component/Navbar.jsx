import React, { useState } from "react";
import profile from "../assets/profile.png";
import {
  Bell,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <div
        className="fixed top-0 left-0 md:ml-64 right-0 z-50
        h-14 sm:h-16
        bg-gradient-to-r from-[#0f172a] to-[#020617]
        text-white border-b border-gray-800 
        px-4 sm:px-4 md:px-8 
        flex justify-between items-center "
      >
        {/* 🔹 LEFT */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          <h1 onClick={() => navigate("/dashboard")} className="text-sm sm:text-lg md:text-xl font-semibold">
            Dashboard
          </h1>
        </div>

        {/* 🔹 RIGHT (DESKTOP / TABLET) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {isLoggedIn && (
            <>
              {/* 🔍 Search */}
              <div className="hidden lg:flex items-center bg-[#1e293b] px-3 py-1 rounded-lg w-40 xl:w-56">
                <Search size={14} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-xs lg:text-sm text-gray-200 placeholder-gray-400 w-full"
                />
              </div>

              {/* 🔔 Notification */}
              <div className="relative cursor-pointer">
                <Bell className="text-gray-300 hover:text-white" size={18} />
                <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-[10px] px-1 rounded-full">
                  !
                </span>
              </div>

              {/* 👤 Profile */}
              <div className="relative">
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 cursor-pointer bg-[#1e293b] px-2 lg:px-3 py-1 rounded-lg hover:bg-[#334155]"
                >
                  <img
                    src={profile}
                    alt="profile"
                    className="w-7 h-7 lg:w-8 lg:h-8 rounded-full"
                  />
                  <ChevronDown size={14} />
                </div>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-xl shadow-lg overflow-hidden">

                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold">Mohit</p>
                      <p className="text-xs text-gray-500">mohit@gmail.com</p>
                    </div>

                    <div
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <User size={16} /> Profile
                    </div>

                    <div
                      onClick={() => navigate("/dashboard/settings")}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Settings size={16} /> Settings
                    </div>

                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                    >
                      <LogOut size={16} /> Logout
                    </div>
                  </div>
                )}
              </div>

              {/* 🚪 Sign Out */}
              <button
                onClick={handleLogout}
                className="hidden lg:block bg-[#1e293b] px-3 lg:px-4 py-1 rounded-lg text-xs lg:text-sm hover:bg-red-500 transition"
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* 🔹 MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-2">
          {isLoggedIn && (
            <>
              <Bell size={18} />
              <img
                src={profile}
                alt="profile"
                className="w-7 h-7 rounded-full"
              />
            </>
          )}
        </div>
      </div>

      {/* ✅ MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed top-14 sm:top-16 left-0 w-full bg-[#020617] text-white shadow-lg md:hidden p-4 z-40">

          <div className="space-y-3 text-sm">
            <p
              onClick={() => {
                setMobileMenu(false);
                navigate("/");
              }}
              className="cursor-pointer"
            >
              Dashboard
            </p>

            <p
              onClick={() => {
                setMobileMenu(false);
                navigate("/dashboard/employees");
              }}
              className="cursor-pointer"
            >
              Employees
            </p>

            <p
              onClick={() => {
                setMobileMenu(false);
                navigate("/dashboard/attendance");
              }}
              className="cursor-pointer"
            >
              Attendance
            </p>

            <p
              onClick={() => {
                setMobileMenu(false);
                navigate("/dashboard/payroll");
              }}
              className="cursor-pointer"
            >
              Payroll
            </p>
          </div>

          {isLoggedIn && (
            <div className="mt-4 border-t border-gray-700 pt-3 space-y-2 text-sm">
              <p onClick={() => navigate("/dashboard/profile")} className="cursor-pointer">Profile</p>
              <p
                onClick={() => {
                  setMobileMenu(false);
                  navigate("/dashboard/settings");
                }}
                className="cursor-pointer"
              >
                Settings
              </p>
              <p onClick={handleLogout} className="text-red-400 cursor-pointer">Logout</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;