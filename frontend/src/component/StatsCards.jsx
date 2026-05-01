import React from "react";
import { Users, UserCheck, CalendarClock, Briefcase } from "lucide-react";

const StatsCards = ({ stats }) => {
  const data = [
    {
      title: "Total Employees",
      value: stats?.totalEmployees || 0,
      sub: "+4 this month",
      subColor: "text-green-400",
      icon: <Users size={20} />,
      bgGlow: "from-blue-500/20 to-transparent",
    },
    {
      title: "Active Employees",
      value: stats?.activeEmployees || 0,
      sub: "93% active rate",
      subColor: "text-green-400",
      icon: <UserCheck size={20} />,
      bgGlow: "from-green-500/20 to-transparent",
    },
    {
      title: "Pending Leaves",
      value: stats?.pendingLeaves || 0,
      sub: "3 urgent",
      subColor: "text-red-400",
      icon: <CalendarClock size={20} />,
      bgGlow: "from-yellow-500/20 to-transparent",
    },
    {
      title: "Open Jobs",
      value: stats?.openJobs || 0,
      sub: "+2 new postings",
      subColor: "text-green-400",
      icon: <Briefcase size={20} />,
      bgGlow: "from-purple-500/20 to-transparent",
    },
  ];

  return (
    <>
    <div className="md:pt-10 pt-4 md:px-4 text-white">
  {/* Header Row */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    
    {/* Left Text */}
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Good Morning, Admin <span className="ml-1">👋</span>
      </h1>
      <p className="text-gray-400 mt-1 text-sm md:text-base">
        Here’s what’s happening today — April 20, 2026
      </p>
    </div>

    {/* Button */}
    <button className="self-start md:self-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition px-5 py-2 rounded-xl font-medium shadow-lg">
      + Quick Action
    </button>
  </div>

</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative bg-[#0f172a] border border-gray-800 rounded-2xl p-5 flex justify-between items-center overflow-hidden hover:shadow-xl transition"
        >
          {/* Glow Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-30`}
          />

          {/* Left Content */}
          <div className="relative z-10">
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-3xl font-semibold text-white mt-1">
              {item.value}
            </h2>
            <p className={`text-sm mt-1 ${item.subColor}`}>{item.sub}</p>
          </div>

          {/* Icon */}
          <div className="relative z-10 bg-white/10 p-3 rounded-xl text-white">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default StatsCards;