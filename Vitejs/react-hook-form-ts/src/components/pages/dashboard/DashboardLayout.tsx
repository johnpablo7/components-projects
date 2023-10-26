import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="bg-white min-h-screen grid grid-cols-[284px_auto] w-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};
