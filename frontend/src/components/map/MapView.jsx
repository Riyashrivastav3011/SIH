import React from "react";

export default function MapView({ train }) {
  if (!train) {
    return (
      <div className="h-80 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
        <p className="opacity-60">Train location unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative h-80 rounded-xl overflow-hidden bg-[#e8eef5] dark:bg-[#081d33]">

      {/* Map Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-0 right-0 border-t-2 border-gray-400" />
        <div className="absolute top-32 left-0 right-0 border-t-2 border-gray-400" />
        <div className="absolute top-56 left-0 right-0 border-t-2 border-gray-400" />
        <div className="absolute top-20 left-1/4 h-60 border-l-2 border-gray-400 rotate-12" />
        <div className="absolute top-0 left-1/2 h-80 border-l-2 border-gray-400 -rotate-12" />
        <div className="absolute top-10 right-1/4 h-60 border-l-2 border-gray-400 rotate-45" />
      </div>

      {/* Route Line */}
      <div className="absolute left-12 right-12 top-1/2 h-1 bg-[#0f62fe] rounded-full" />

      {/* Origin */}
      <div className="absolute left-8 top-[calc(50%-8px)]">
        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow" />
      </div>

      {/* Current Train */}
      <div className="absolute left-1/2 top-[calc(50%-18px)] -translate-x-1/2">
        <div className="bg-[#0f62fe] text-white px-3 py-2 rounded-lg shadow-lg text-xs font-bold">
          🚆 {train.number}
        </div>

        <div className="w-3 h-3 bg-[#0f62fe] rotate-45 mx-auto -mt-1" />
      </div>

      {/* Destination */}
      <div className="absolute right-8 top-[calc(50%-8px)]">
        <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow" />
      </div>

      {/* Location Info */}
      <div className="absolute left-4 bottom-4 bg-white dark:bg-[#0f365c] p-3 rounded-xl shadow-lg">
        <div className="text-xs opacity-60">
          CURRENT LOCATION
        </div>

        <div className="font-bold">
          {train.currentLocation?.name || "Unknown"}
        </div>

        <div className="text-xs opacity-60 mt-1">
          {train.currentLocation?.lat},{" "}
          {train.currentLocation?.lng}
        </div>
      </div>

    </div>
  );
}