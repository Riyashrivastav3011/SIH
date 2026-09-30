import React from "react";
import {
  TrainFront,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#071b2e] text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ================= BRAND ================= */}
          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >

              <div
                className="
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  bg-gradient-to-br
                  from-blue-500
                  to-blue-700
                  shadow-lg
                  shadow-blue-500/20
                  transition-transform duration-300
                  group-hover:scale-105
                "
              >
                <TrainFront
                  size={22}
                  strokeWidth={2.4}
                />
              </div>

              <div>
                <h2 className="text-lg font-extrabold tracking-tight">
                  RAIL<span className="text-blue-400">CAST</span>
                </h2>

                <p className="text-[8px] tracking-[2px] text-gray-400 uppercase">
                  Intelligent Rail Network
                </p>
              </div>

            </Link>


            <p className="mt-5 text-sm leading-6 text-gray-400 max-w-xs">
              Intelligent railway analytics and dynamic ETA forecasting
              for smarter, safer and more efficient rail operations.
            </p>


            {/* System Status */}
            <div
              className="
                mt-5
                inline-flex items-center gap-2
                px-3 py-2
                rounded-lg
                bg-white/5
                border border-white/10
              "
            >

              <span className="relative flex h-2.5 w-2.5">

                <span
                  className="
                    absolute
                    inline-flex
                    h-full w-full
                    rounded-full
                    bg-emerald-400
                    opacity-50
                    animate-ping
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2.5 w-2.5
                    rounded-full
                    bg-emerald-500
                  "
                />

              </span>

              <span className="text-xs text-gray-300">
                All systems operational
              </span>

            </div>

          </div>


          {/* ================= PLATFORM ================= */}
          <div>

            <h3 className="text-sm font-semibold text-white mb-5">
              Platform
            </h3>

            <div className="space-y-3">

              <Link
                to="/"
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>

              <Link
                to="/trains"
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Live Trains
              </Link>

              <Link
                to="/network"
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Rail Network
              </Link>

              <Link
                to="/analytics"
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Analytics
              </Link>

            </div>

          </div>


          {/* ================= INTELLIGENCE ================= */}
          <div>

            <h3 className="text-sm font-semibold text-white mb-5">
              Intelligence
            </h3>

            <div className="space-y-3">

              <Link
                to="/predictions"
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                ETA Predictions
                <ArrowUpRight size={13} />
              </Link>

              <Link
                to="/alerts"
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Delay Alerts
                <ArrowUpRight size={13} />
              </Link>

              <Link
                to="/performance"
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Network Performance
                <ArrowUpRight size={13} />
              </Link>

              <Link
                to="/reports"
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Reports
                <ArrowUpRight size={13} />
              </Link>

            </div>

          </div>


          {/* ================= CONNECT ================= */}
          <div>

            <h3 className="text-sm font-semibold text-white mb-5">
              Connect
            </h3>

            <p className="text-sm text-gray-400 leading-6 mb-5">
              Have questions or want to know more about RailCast?
              Get in touch with our team.
            </p>


            <a
              href="mailto:hello@railcast.ai"
              className="
                inline-flex items-center gap-2
                text-sm
                text-gray-300
                hover:text-blue-400
                transition-colors
              "
            >
              <Mail size={16} />
              hello@railcast.ai
            </a>


            {/* Social Buttons */}
            <div className="flex items-center gap-2 mt-5">

              <a
                href="#"
                aria-label="GitHub"
                className="
                  w-9 h-9
                  rounded-lg
                  flex items-center justify-center
                  bg-white/5
                  border border-white/10
                  text-gray-400
                  hover:text-white
                  hover:bg-white/10
                  hover:-translate-y-0.5
                  transition-all duration-200
                  text-xs font-bold
                "
              >
                GH
              </a>


              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  w-9 h-9
                  rounded-lg
                  flex items-center justify-center
                  bg-white/5
                  border border-white/10
                  text-gray-400
                  hover:text-white
                  hover:bg-white/10
                  hover:-translate-y-0.5
                  transition-all duration-200
                  text-xs font-bold
                "
              >
                in
              </a>

            </div>

          </div>

        </div>


        {/* Railway Line */}
        <div className="relative mt-10 h-px bg-white/10">

          <div
            className="
              absolute
              left-0
              -top-[2px]
              w-1/3
              h-[3px]
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-blue-500
              to-transparent
              opacity-80
            "
          />

        </div>


        {/* Bottom */}
        <div
          className="
            pt-6
            flex flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          <p className="text-xs text-gray-500">
            © 2026 RailCast. Built for smarter railway operations.
          </p>


          <div className="flex items-center gap-5">

            <Link
              to="/privacy"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms
            </Link>

            <span className="text-xs text-gray-600">
              v1.0
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}