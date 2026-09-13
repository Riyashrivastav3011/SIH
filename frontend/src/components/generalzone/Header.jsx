import React, { useState } from "react";
import Logo from "../../assets/img.png";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaHome,
  FaBriefcase,
  FaBookOpen,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      

      <header className="w-full header-slide-down bg-white shadow-sm sticky top-0 z-50">

        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:ps-20">

          <div className="flex h-20 items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center shrink-0"
            >
             <img
  src={Logo}
  alt="Arcass"
  className="logo-slide-up h-16 sm:h-20  w-auto object-contain"
/>
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <nav className="hidden md:flex items-center gap-7">

              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-black hover:text-[#b68961] transition"
              >
                <FaHome />
                Home
              </Link>

              <Link
                to="/Student"
                className="flex items-center gap-2 text-sm font-medium text-black hover:text-[#b68961] transition"
              >
                <FaBriefcase />
                Portfolio
              </Link>

              <Link
                to="/course"
                className="flex items-center gap-2 text-sm font-medium text-black hover:text-[#b68961] transition"
              >
                <FaBookOpen />
                Explore Courses
              </Link>

              <Link
                to="/jobs"
                className="flex items-center gap-2 text-sm font-medium text-black hover:text-[#b68961] transition"
              >
                <FaGraduationCap />
                Jobs
              </Link>

            </nav>

            {/* ================= RIGHT SIDE ================= */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* REGISTER */}
              <Link
                to="/register"
                className="
                  flex items-center gap-1.5
                  rounded-full
                  border border-black
                  px-3 py-1.5
                  sm:px-4 sm:py-2
                  text-xs sm:text-sm
                  font-medium
                  text-black
                  hover:border-[#b68961]
                  hover:text-[#b68961]
                  transition
                "
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>

              {/* LOGIN */}
              <Link
                to="/login"
                className="
                  flex items-center gap-1.5
                  rounded-full
                  bg-black
                  px-3 py-1.5
                  sm:px-4 sm:py-2
                  text-xs sm:text-sm
                  font-medium
                  text-white
                  hover:bg-[#b68961]
                  transition
                "
              >
                <FaSignInAlt />
                <span>Log In</span>
              </Link>

              {/* PROFILE ICON */}
              <Link
                to="/Student"
                aria-label="Profile"
                className="
                  hidden sm:flex
                  rounded-full
                  border border-black
                  p-1.5
                  text-xl
                  text-black
                  hover:text-[#b68961]
                  hover:border-[#b68961]
                  transition
                "
              >
                <FaUserCircle />
              </Link>

              {/* HAMBURGER */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className=" 
                  md:hidden
                  ml-1
                  rounded-lg
                  p-2
                  text-black
                  hover:text-[#b68961]
                  hover:bg-gray-100
                  transition
                "
              >
                {open ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>

            </div>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`
            md:hidden
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${
              open
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div className="border-t border-gray-100 bg-white px-4 py-4">

            <nav className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="
                  flex items-center gap-3
                  rounded-lg
                  px-4 py-3
                  text-sm
                  font-medium
                  text-black
                  hover:bg-gray-100
                  hover:text-[#b68961]
                  transition
                "
              >
                <FaHome />
                Home
              </Link>

              <Link
                to="/portfolio"
                onClick={closeMenu}
                className="
                  flex items-center gap-3
                  rounded-lg
                  px-4 py-3
                  text-sm
                  font-medium
                  text-black
                  hover:bg-gray-100
                  hover:text-[#b68961]
                  transition
                "
              >
                <FaBriefcase />
                Portfolio
              </Link>

              <Link
                to="/courses"
                onClick={closeMenu}
                className="
                  flex items-center gap-3
                  rounded-lg
                  px-4 py-3
                  text-sm
                  font-medium
                  text-black
                  hover:bg-gray-100
                  hover:text-[#b68961]
                  transition
                "
              >
                <FaBookOpen />
                Explore Courses
              </Link>

              <Link
                to="/institution"
                onClick={closeMenu}
                className="
                  flex items-center gap-3
                  rounded-lg
                  px-4 py-3
                  text-sm
                  font-medium
                  text-black
                  hover:bg-gray-100
                  hover:text-[#b68961]
                  transition
                "
              >
                <FaGraduationCap />
                Institution
              </Link>

              {/* Mobile Profile */}
              <Link
                to="/user"
                onClick={closeMenu}
                className="
                  mt-2
                  flex items-center gap-3
                  rounded-lg
                  bg-gray-50
                  px-4 py-3
                  text-sm
                  font-medium
                  text-black
                  hover:bg-gray-100
                  hover:text-[#b68961]
                  transition
                "
              >
                <FaUserCircle className="text-xl" />
                My Profile
              </Link>

            </nav>

          </div>
        </div>

      </header>
    </>
  );
}

export default Header;

