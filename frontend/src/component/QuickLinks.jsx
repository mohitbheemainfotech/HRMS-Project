import React from "react";
import {
  Users,
  CalendarCheck,
  DollarSign,
  FileText,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  {
    title: "Employees",
    icon: <Users size={20} />,
    color: "from-blue-500/20 to-transparent",
    path: "/dashboard/employees",
  },
  {
    title: "Attendance",
    icon: <CalendarCheck size={20} />,
    color: "from-green-500/20 to-transparent",
    path: "/dashboard/attendance",
  },
  {
    title: "Payroll",
    icon: <DollarSign size={20} />,
    color: "from-yellow-500/20 to-transparent",
    path: "/dashboard/payroll",
  },
  {
    title: "Reports",
    icon: <BarChart3 size={20} />,
    color: "from-purple-500/20 to-transparent",
    path: "/dashboard/Performance",
  },
  {
    title: "Documents",
    icon: <FileText size={20} />,
    color: "from-pink-500/20 to-transparent",
    path: "/documents",
  },
  {
    title: "Jobs",
    icon: <Briefcase size={20} />,
    color: "from-indigo-500/20 to-transparent",
    path: "/dashboard/jobs",
  },
];

const QuickLinks = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
        {quickLinks.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="relative bg-[#111827] border border-gray-800 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            {/* Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30`}
            />

            {/* Icon */}
            <div className="relative z-10 bg-white/10 p-3 rounded-xl text-white mb-2 group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* Title */}
            <p className="relative z-10 text-sm font-medium text-gray-300 hover:text-white transition">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;