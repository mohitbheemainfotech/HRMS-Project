import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 px-4 sm:px-6 md:px-8 py-6 sm:py-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Company Info */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              Bheema Infotech Pvt Ltd
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Building smart HR solutions to manage employees, payroll,
              recruitment, and analytics — all in one place.
            </p>

            <div className="flex gap-4 mt-4">
              <Globe className="cursor-pointer hover:text-white transition" size={18} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/")}>Dashboard</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/dashboard/employees")}>Employees</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/dashboard/attendance")}>Attendance</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/dashboard/payroll")}>Payroll</li>
              <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/dashboard/applicant")}>Recruitment</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-3">Contact</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} /> support@company.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} /> Bhopal, India
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm">

          <p className="text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">
              Bheema Infotech Pvt Ltd
            </span>. All rights reserved.
          </p>

          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;