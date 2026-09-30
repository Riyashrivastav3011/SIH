import React from "react";
// import { useTrainStore } from "../store/useTrainStore";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Dashboard() {
  const { trains, search, setSearch } = useTrainStore();

  const filtered = trains.filter((train) =>
    (
      train.number +
      train.name +
      train.origin +
      train.destination
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const kpis = {
    active: trains.length,
    onTime: trains.filter((train) => train.status === "ON_TIME").length,
    delayed: trains.filter((train) => train.status === "DELAYED").length,
    critical: trains.filter((train) => train.status === "CRITICAL").length,
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-bold">
        Passenger Dashboard
      </h1>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-3 opacity-50"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Train number, name, station, destination"
          className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-white/5"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            l: "Active Trains",
            v: kpis.active,
          },
          {
            l: "On Time",
            v: kpis.onTime,
          },
          {
            l: "Delayed",
            v: kpis.delayed,
          },
          {
            l: "Critical Delay",
            v: kpis.critical,
          },
        ].map((kpi) => (
          <div
            key={kpi.l}
            className="bg-white dark:bg-white/5 p-5 rounded-2xl border"
          >
            <div className="text-sm opacity-60">
              {kpi.l}
            </div>

            <div className="text-2xl font-bold">
              {kpi.v}
            </div>
          </div>
        ))}
      </div>

      {/* Train List */}
      <div className="bg-white dark:bg-white/5 rounded-2xl border overflow-hidden">

        <div className="p-4 font-semibold">
          Popular / Recent Trains
        </div>

        <div className="divide-y">
          {filtered.slice(0, 8).map((train) => (
            <Link
              key={train.number}
              to={`/train/${train.number}`}
              className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <div>
                <div className="font-semibold">
                  {train.number} - {train.name}
                </div>

                <div className="text-xs opacity-60">
                  {train.origin} → {train.destination}
                </div>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-bold ${
                  train.status === "ON_TIME"
                    ? "bg-green-100 text-green-700"
                    : train.status === "DELAYED"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {train.status.replace("_", " ")}
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="p-6 text-center opacity-60">
              No trains found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}