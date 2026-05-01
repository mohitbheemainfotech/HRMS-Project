import React, { useState } from "react";
import profile from '../assets/profile.png'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Briefcase,
  FileText,
  Calendar,
  Wallet,
  Star,
  Settings,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menu = [
    {
      title: "Overview",
      items: [{ name: "Dashboard", icon: <LayoutDashboard />,path:"/dashboard" }],
    },
    {
      title: "Employees",
      items: [
        { name: "Employee List", icon: <Users />, path: "/dashboard/employees" },
        { name: "Add Employee", icon: <UserPlus /> ,path:"/dashboard/employees/add"},
      ],
    },
    {
      title: "Recruitment",
      items: [
        { name: "Job Postings", icon: <Briefcase />, path:"/dashboard/jobs" },
        { name: "Applicants", icon: <FileText />, path:"/dashboard/applicant" },
      ],
    },
    {
      title: "HR Operations",
      items: [
        { name: "Attendance", icon: <Calendar /> ,path:"/dashboard/attendance" },
        { name: "Leave Management", icon: <Calendar />, path:"/dashboard/leavemanagement", active: true },
        { name: "Payroll", icon: <Wallet />, path:"/dashboard/payroll" },
      ],
    },
    {
      title: "Performance",
      items: [{ name: "Performance", icon: <Star />,path:"/dashboard/Performance" }],
    },
    {
      title: "Config",
      items: [{ name: "Settings", icon: <Settings /> ,path:"/dashboard/settings"}],
    },
  ];

  return (
    <>
      {/* ✅ Mobile Toggle */}
      <div className="md:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-[#1e293b] p-2 rounded-lg shadow"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ✅ Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col
        bg-gradient-to-b from-[#0f172a] to-[#020617] text-gray-300
        border-r border-gray-800 shadow-xl
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300`}
      >

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold text-indigo-500 tracking-wide">
              HRMS
            </h1>
            <p className="text-xs text-gray-400">Management Portal</p>
          </div>

          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">

          {menu.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl uppercase  text-gray-500 mb-2">
                {section.title}
              </h2>

              <div className="space-y-1">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => item.path && navigate(item.path)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group
                      ${
                        item.active
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-[#1e293b] hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 group-hover:text-white">
                        {item.icon}
                      </span>
                      <span className="text-base font-medium">
                        {item.name}
                      </span>
                    </div>

                    {item.badge && (
                      <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#020617]">
          <div className="flex items-center gap-3">
            <img
              src={profile}
              alt="admin"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;