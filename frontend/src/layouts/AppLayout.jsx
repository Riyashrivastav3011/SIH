import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import {
  LayoutDashboard,
  Map,
  BarChart3,
  AlertTriangle,
  Activity,
  Settings,
  Train,
} from "lucide-react";
import Footer from "../components/common/Footer"

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/control-room",
    label: "Control Room",
    icon: Map,
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    to: "/alerts",
    label: "Alerts",
    icon: AlertTriangle,
  },
  {
    to: "/system-health",
    label: "System Health",
    icon: Activity,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f6f9] dark:bg-[#081d33] text-gray-900 dark:text-gray-100">
      
      <Navbar onMenu={() => setOpen(!open)} />

      <div className="flex">

        {/* Sidebar */}
        <aside
          className={`${open ? "block" : "hidden"} lg:block w-64 bg-white dark:bg-[#0f365c] border-r dark:border-white/10 min-h-[calc(100vh-56px)] p-4 sticky top-14`}
        >
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      isActive
                        ? "bg-[#0f62fe] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-white/10"
                    }`
                  }
                >
                  <Icon size={18} />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Live Prediction Engine */}
          <div className="mt-6 p-3 bg-blue-50 dark:bg-white/10 rounded-xl text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <Train size={16} />
              Live Prediction Engine
            </div>

            <p className="opacity-70 mt-1">
              XGBoost + LSTM + GNN ensemble running. 93.2% accuracy.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>

      </div>
      <Footer/>
    </div>
  );
}
