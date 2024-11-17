import React from 'react';
import Sidebar from "../Pages/Sidebar/Sidebar"
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
