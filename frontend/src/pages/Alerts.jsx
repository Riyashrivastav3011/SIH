import React, { useMemo, useState } from "react";
import "./Cascade.css";

const initialAlerts = [
  {
    id: 1,
    severity: "critical",
    title: "Train delay threshold exceeded",
    train: "12951",
    trainName: "Mumbai Rajdhani",
    location: "Kota Junction",
    message: "Train is running 42 minutes behind schedule.",
    time: "2 min ago",
    status: "active",
  },
  {
    id: 2,
    severity: "warning",
    title: "Signal communication degraded",
    train: "—",
    trainName: "Control Zone B",
    location: "Ratlam Section",
    message: "Interlocking communication response time is above normal.",
    time: "8 min ago",
    status: "active",
  },
  {
    id: 3,
    severity: "warning",
    title: "Platform occupancy conflict",
    train: "12953",
    trainName: "August Kranti",
    location: "New Delhi",
    message: "Expected platform occupancy overlaps with another service.",
    time: "14 min ago",
    status: "active",
  },
  {
    id: 4,
    severity: "info",
    title: "Train entered monitoring zone",
    train: "12432",
    trainName: "Rajdhani Express",
    location: "Bhopal Zone",
    message: "Train successfully entered the monitored section.",
    time: "22 min ago",
    status: "active",
  },
  {
    id: 5,
    severity: "critical",
    title: "Communication heartbeat lost",
    train: "12002",
    trainName: "Shatabdi Express",
    location: "Agra Control",
    message: "No heartbeat received from onboard telemetry gateway.",
    time: "31 min ago",
    status: "active",
  },
  {
    id: 6,
    severity: "info",
    title: "Schedule recovered",
    train: "12951",
    trainName: "Mumbai Rajdhani",
    location: "Sawai Madhopur",
    message: "Train recovered 11 minutes of previous delay.",
    time: "46 min ago",
    status: "resolved",
  },
];

function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesFilter =
        filter === "all" ||
        alert.severity === filter ||
        alert.status === filter;

      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        alert.title.toLowerCase().includes(query) ||
        alert.train.toLowerCase().includes(query) ||
        alert.trainName.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [alerts, filter, search]);

  const activeCount = alerts.filter((a) => a.status === "active").length;
  const criticalCount = alerts.filter(
    (a) => a.severity === "critical" && a.status === "active"
  ).length;
  const warningCount = alerts.filter(
    (a) => a.severity === "warning" && a.status === "active"
  ).length;
  const resolvedCount = alerts.filter((a) => a.status === "resolved").length;

  const resolveAlert = (id) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  const clearResolved = () => {
    setAlerts((current) => current.filter((alert) => alert.status !== "resolved"));
  };

  return (
    <div className="al-page">
      <header className="al-header">
        <div>
          <div className="al-breadcrumb">
            Operations <span>/</span> Alerts
          </div>

          <h1>Alert Center</h1>
          <p>
            Monitor operational warnings, incidents and railway system events.
          </p>
        </div>

        <div className="al-header-status">
          <span className="al-live-dot"></span>
          Monitoring Active
        </div>
      </header>

      <section className="al-summary-grid">
        <div className="al-summary-card">
          <span className="al-summary-label">Active Alerts</span>
          <strong>{activeCount}</strong>
          <small>Requires attention</small>
        </div>

        <div className="al-summary-card al-critical">
          <span className="al-summary-label">Critical</span>
          <strong>{criticalCount}</strong>
          <small>Immediate response</small>
        </div>

        <div className="al-summary-card al-warning">
          <span className="al-summary-label">Warnings</span>
          <strong>{warningCount}</strong>
          <small>Operational monitoring</small>
        </div>

        <div className="al-summary-card al-resolved">
          <span className="al-summary-label">Resolved</span>
          <strong>{resolvedCount}</strong>
          <small>Closed incidents</small>
        </div>
      </section>

      <section className="al-toolbar">
        <div className="al-tabs">
          {[
            ["all", "All Alerts"],
            ["critical", "Critical"],
            ["warning", "Warnings"],
            ["info", "Information"],
            ["resolved", "Resolved"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={filter === value ? "active" : ""}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="al-actions">
          <div className="al-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search train, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="al-clear-btn" onClick={clearResolved}>
            Clear Resolved
          </button>
        </div>
      </section>

      <section className="al-content">
        <div className="al-content-head">
          <div>
            <h2>Operational Events</h2>
            <span>{filteredAlerts.length} events displayed</span>
          </div>

          <div className="al-refresh">
            Last synchronized <strong>just now</strong>
          </div>
        </div>

        <div className="al-list">
          {filteredAlerts.length === 0 ? (
            <div className="al-empty">
              <div className="al-empty-icon">✓</div>
              <h3>No alerts found</h3>
              <p>There are no events matching your current filters.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <article
                className={`al-alert al-${alert.severity} ${
                  alert.status === "resolved" ? "is-resolved" : ""
                }`}
                key={alert.id}
              >
                <div className="al-severity">
                  <span>
                    {alert.severity === "critical"
                      ? "!"
                      : alert.severity === "warning"
                      ? "▲"
                      : "i"}
                  </span>
                </div>

                <div className="al-alert-main">
                  <div className="al-alert-top">
                    <div>
                      <div className="al-alert-title-row">
                        <h3>{alert.title}</h3>

                        <span className="al-severity-tag">
                          {alert.severity}
                        </span>
                      </div>

                      <p>{alert.message}</p>
                    </div>

                    <time>{alert.time}</time>
                  </div>

                  <div className="al-alert-meta">
                    <span>
                      <b>Train</b>
                      {alert.train} {alert.trainName !== "—" && `• ${alert.trainName}`}
                    </span>

                    <span>
                      <b>Location</b>
                      {alert.location}
                    </span>

                    <span>
                      <b>Status</b>
                      <em className={alert.status}>{alert.status}</em>
                    </span>
                  </div>
                </div>

                {alert.status === "active" && (
                  <button
                    className="al-resolve"
                    onClick={() => resolveAlert(alert.id)}
                  >
                    Resolve
                  </button>
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Alerts;