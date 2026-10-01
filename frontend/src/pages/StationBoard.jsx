import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArrivals, getStations } from "../services/trainApi";
import { useLive } from "../hooks/useLive";

const time = (d) =>
  new Date(d).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });

export default function StationBoard() {
  const { code: param } = useParams();
  const code = (param || "CNB").toUpperCase();
  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getStations().then(setStations).catch(() => {});
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await getArrivals(code);
      setRows(data.arrivals || []);
      setError("");
    } catch (e) {
      setError("Unable to load arrivals. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    setLoading(true);
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, [load]);

  useLive("subscribe:station", code, "arrival", load);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Station Board</h1>
          <p className="text-sm opacity-60">
            Live predicted arrivals at the selected station.
          </p>
        </div>

        <select
          value={code}
          onChange={(e) => navigate(`/station-board/${e.target.value}`)}
          className="px-4 py-2 rounded-xl border bg-white dark:bg-white/5"
        >
          {stations.length === 0 && <option value={code}>{code}</option>}
          {stations.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name} ({s.code})
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-white/5 rounded-2xl border overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-semibold opacity-60 border-b">
          <div className="col-span-5">TRAIN</div>
          <div className="col-span-2">SCHEDULED</div>
          <div className="col-span-3">PREDICTED ETA</div>
          <div className="col-span-2 text-right">DELAY</div>
        </div>

        <div className="divide-y">
          {rows.map((r) => (
            <Link
              key={r.trainNo}
              to={`/train/${r.trainNo}`}
              className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <div className="col-span-5">
                <div className="font-semibold">
                  {r.trainNo} - {r.trainName}
                </div>
                <div className="text-xs opacity-60">
                  Last seen at {r.lastStation}
                </div>
              </div>
              <div className="col-span-2">{time(r.scheduledArrival)}</div>
              <div className="col-span-3 font-bold">{time(r.predictedETA)}</div>
              <div className="col-span-2 text-right">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-bold ${
                    r.predictedDelayMin >= 30
                      ? "bg-red-100 text-red-700"
                      : r.predictedDelayMin >= 10
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {r.predictedDelayMin > 0 ? `+${r.predictedDelayMin}m` : "On time"}
                </span>
              </div>
            </Link>
          ))}

          {rows.length === 0 && (
            <div className="p-6 text-center opacity-60">
              {loading
                ? "Loading arrivals..."
                : "No trains are approaching this station right now."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
