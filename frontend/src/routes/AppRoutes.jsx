import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";

import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";

import EmployeeList from "../pages/Employees/EmployeeList";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import AddEditEmployee from "../pages/Employees/AddEditEmployee";

import Attendance from "../pages/Attendance/Attendance";
import ProtectedRoute from "./ProtectedRoute";
import JobPostings from "../pages/Recruitment/JobPostings";
import ApplicantTracking from "../pages/Recruitment/ApplicantTracking";
import LeaveManagement from "../pages/Leave/LeaveManagement";
import PayrollManagement from "../pages/Payroll/PayrollManagement";
import PerformanceReview from "../pages/Performance/PerformanceReview";
import SystemSettings from "../pages/Settings/SystemSettings";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* 👇 Nested Routes (IMPORTANT) */}
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/employees" element={<EmployeeList />} />
        <Route path="/dashboard/employees/add" element={<AddEditEmployee />} />
        <Route path="/dashboard/employees/:id" element={<EmployeeDetails />} />
        <Route path="/dashboard/employees/edit/:id" element={<AddEditEmployee />} />
        <Route path="/dashboard/attendance" element={<Attendance />} />
        <Route path="/dashboard/jobs" element={<JobPostings/>}/>
        <Route path="/dashboard/applicant" element={<ApplicantTracking/>}/>
        <Route path="/dashboard/leavemanagement" element={<LeaveManagement/>}/>
        <Route path="/dashboard/payroll" element={<PayrollManagement/>}/>
        <Route path="/dashboard/Performance" element={<PerformanceReview/>}/>
        <Route path="/dashboard/settings" element={<SystemSettings/>}/>
      </Route>

    </Routes>
  );
};

export default AppRoutes;