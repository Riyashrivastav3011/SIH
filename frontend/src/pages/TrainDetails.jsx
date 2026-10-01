import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainDetails } from "../services/trainApi";
import { useLive } from "../hooks/useLive";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MapView from "../components/map/MapView";

const COLORS = ["#0f62fe", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444", "#06b6d4"];

export default function TrainDetails() {
  const { trainNumber } = useParams();

  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setTrain(await getTrainDetails(trainNumber));
      setError("");
    } catch (e) {
      setError(e?.response?.data?.error || "Unable to load train details");
    } finally {
      setLoading(false);
    }
  }, [trainNumber]);

  useEffect(() => {
    setLoading(true);
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, [load]);

  // live ETA push for this train
  useLive("subscribe:train", trainNumber, "eta", load);

  if (!train) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">
          {loading ? "Loading train..." : error || "Train not found"}
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Train Header */}
      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border">
        <div className="flex flex-wrap justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold">
              {train.number} - {train.name}
            </h1>

            <p className="opacity-60">
              {train.origin} ({train.originCode}) →{" "}
              {train.destination} ({train.destCode}){" "}
              •{" "}
              <span className="font-semibold">
                {train.status}
              </span>
            </p>
          </div>

          <div className="text-sm opacity-60">
            DEMO: predictions are estimates
          </div>

        </div>

        {/* ETA Section */}
        <div className="grid lg:grid-cols-3 gap-4 mt-6">

          <div className="lg:col-span-2 bg-gradient-to-br from-[#0a2540] to-[#0f62fe] text-white p-6 rounded-2xl">

            <div className="text-xs tracking-widest opacity-80">
              NEXT STATION
            </div>

            <div className="text-2xl font-bold">
              {train.eta.nextStation} (
              {train.eta.nextStationCode})
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">

              <div>
                <div className="text-xs opacity-80">
                  AI PREDICTED ETA
                </div>

                <div className="text-2xl font-bold">
                  {train.eta.predicted}
                </div>
              </div>

              <div>
                <div className="text-xs opacity-80">
                  SCHEDULED
                </div>

                <div className="text-xl">
                  {train.eta.scheduled}
                </div>
              </div>

              <div>
                <div className="text-xs opacity-80">
                  EXPECTED DELAY
                </div>

                <div className="text-xl">
                  +{train.eta.delayMinutes} min
                </div>
              </div>

              <div>
                <div className="text-xs opacity-80">
                  CONFIDENCE
                </div>

                <div className="text-xl">
                  {train.eta.confidence}%
                </div>
              </div>

            </div>
          </div>

          {/* Current Location */}
          <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border">
            <div className="text-sm opacity-60">
              CURRENT LOCATION
            </div>

            <div className="text-xl font-bold mt-2">
              {train.currentLocation.name}
            </div>

            <div className="text-sm opacity-60 mt-2">
              Lat: {train.currentLocation.lat}
            </div>

            <div className="text-sm opacity-60">
              Lng: {train.currentLocation.lng}
            </div>
          </div>

        </div>
      </div>

      {/* Map */}
      <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border">
        <h2 className="text-lg font-bold mb-4">
          Live Train Location
        </h2>

        <MapView train={train} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border">
          <h2 className="text-lg font-bold mb-4">
            Train Route
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={train.stations}
              >
                <XAxis dataKey="code" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="delayMinutes"
                  stroke="#0f62fe"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delay Factors */}
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border">
          <h2 className="text-lg font-bold mb-4">
            Delay Factors
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={train.delayFactors}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {train.delayFactors.map((item, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}