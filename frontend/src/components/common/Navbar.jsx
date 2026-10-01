import React from "react";
import {
  TrainFront,
  Sun,
  Moon,
  Bell,
  Menu,
  Sparkles,
} from "lucide-react";
import { useThemeStore } from "../../store/useThemestore";
import { logoutUser } from "../../services/authApi";
import { Link } from "react-router-dom";

export default function Navbar({ onMenu }) {
  const { theme, toggle } = useThemeStore();
  const token = localStorage.getItem("token");

  return (
    <header
      className="
        sticky top-0 z-40
        bg-white/90 dark:bg-[#071b2e]/90
        backdrop-blur-xl
        border-b border-gray-200/80 dark:border-white/10
        shadow-sm
      "
    >
      <div className="flex items-center justify-between px-4 sm:px-6 h-[64px]">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button
            onClick={onMenu}
            className="
              lg:hidden
              p-2.5 rounded-xl
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-white/10
              transition-all duration-200
              active:scale-90
            "
          >
            <Menu size={20} />
          </button>


          {/* Logo */}
          <Link
            to="/"
            className="
              group flex items-center gap-3
              select-none
            "
          >

            {/* Logo Icon */}
            <div
              className="
                relative
                w-10 h-10
                rounded-xl
                flex items-center justify-center
                overflow-hidden
                bg-gradient-to-br
                from-blue-500
                to-blue-700
                shadow-lg shadow-blue-500/20
                transition-all duration-300
                group-hover:scale-105
                group-hover:shadow-blue-500/40
              "
            >

              {/* Glow */}
              <div
                className="
                  absolute inset-0
                  bg-white/10
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                "
              />

              <TrainFront
                size={21}
                strokeWidth={2.4}
                className="
                  text-white
                  relative z-10
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                "
              />

              {/* AI Spark */}
              <Sparkles
                size={10}
                className="
                  absolute
                  right-1 top-1
                  text-blue-100
                  animate-pulse
                "
              />
            </div>


            {/* Brand */}
            <div className="hidden sm:block leading-none">

              <div
                className="
                  text-[17px]
                  font-extrabold
                  tracking-tight
                  text-[#0f365c]
                  dark:text-white
                "
              >
                RAIL<span className="text-blue-600">CAST</span>
              </div>

              <div
                className="
                  mt-1
                  text-[8px]
                  font-semibold
                  tracking-[2px]
                  text-gray-400
                  dark:text-gray-500
                  uppercase
                "
              >
                Intelligent Rail Network
              </div>

            </div>

          </Link>

        </div>

{/* ================= CENTER STATUS ================= */}
<div className="hidden lg:flex items-center gap-1">

  {/* Live Status */}
  <div
    className="
      flex items-center gap-2
      px-4 py-2
      rounded-xl
      bg-gray-50
      dark:bg-white/5
      border border-gray-200
      dark:border-white/10
    "
  >
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="
          absolute inline-flex
          h-full w-full
          rounded-full
          bg-emerald-400
          opacity-60
          animate-ping
        "
      />

      <span
        className="
          relative inline-flex
          h-2.5 w-2.5
          rounded-full
          bg-emerald-500
        "
      />
    </span>

    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
      Network Live
    </span>
  </div>


  {/* Divider */}
  <div className="h-7 w-px bg-gray-200 dark:bg-white/10 mx-2" />


  {/* Trains */}
  <div className="px-3 text-center">
    <p className="text-sm font-bold text-[#0f365c] dark:text-white">
      128
    </p>

    <p className="text-[9px] text-gray-400 uppercase tracking-wide">
      Trains
    </p>
  </div>


  {/* On Time */}
  <div className="px-3 text-center">
    <p className="text-sm font-bold text-emerald-500">
      84%
    </p>

    <p className="text-[9px] text-gray-400 uppercase tracking-wide">
      On Time
    </p>
  </div>


  {/* Delayed */}
  <div className="px-3 text-center">
    <p className="text-sm font-bold text-orange-500">
      17
    </p>

    <p className="text-[9px] text-gray-400 uppercase tracking-wide">
      Delayed
    </p>
  </div>


  {/* Updated */}
  <div
    className="
      hidden xl:block
      ml-3
      pl-4
      border-l border-gray-200
      dark:border-white/10
    "
  >
    <p className="text-[9px] text-gray-400">
      LAST UPDATED
    </p>

    <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
      10 sec ago
    </p>
  </div>

</div>




        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-1.5 sm:gap-2">


          {/* Notification */}
          <Link
            to="/alerts"
            className="
              relative
              group
              p-2.5
              rounded-xl
              text-gray-600
              dark:text-gray-300
              hover:bg-gray-100
              dark:hover:bg-white/10
              transition-all duration-200
              active:scale-90
            "
          >
            <Bell
              size={19}
              strokeWidth={2}
              className="
                transition-transform duration-300
                group-hover:rotate-[-8deg]
              "
            />

            {/* Notification Dot */}
            <span
              className="
                absolute
                top-2 right-2
                w-1.5 h-1.5
                rounded-full
                bg-red-500
                ring-2 ring-white
                dark:ring-[#071b2e]
              "
            />
          </Link>


          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="
              group
              p-2.5
              rounded-xl
              text-gray-600
              dark:text-gray-300
              hover:bg-gray-100
              dark:hover:bg-white/10
              transition-all duration-200
              active:scale-90
            "
          >

            {theme === "light" ? (
              <Moon
                size={19}
                className="
                  transition-all duration-300
                  group-hover:-rotate-12
                  group-hover:scale-110
                "
              />
            ) : (
              <Sun
                size={19}
                className="
                  text-amber-400
                  transition-all duration-300
                  group-hover:rotate-45
                  group-hover:scale-110
                "
              />
            )}

          </button>


          {/* Login */}
          <Link
            onClick={() => { if (token) logoutUser(); }}
            to="/login"
            className="
              ml-1
              flex items-center
              bg-gradient-to-r
              from-blue-600
              to-blue-500
              hover:from-blue-700
              hover:to-blue-600
              text-white
              px-4 sm:px-5
              py-2
              rounded-xl
              text-sm
              font-semibold
              shadow-md
              shadow-blue-500/20
              hover:shadow-lg
              hover:shadow-blue-500/30
              transition-all duration-200
              active:scale-95
            "
          >
            {token ? "Logout" : "Login"}
          </Link>

        </div>

      </div>
    </header>
  );
}