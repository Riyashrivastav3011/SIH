import React, { useEffect, useMemo, useRef, useState } from "react";
import { getAlerts } from "../services/trainApi";
import "./Cascade.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const resolvedRef = useRef(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAlerts();
        setAlerts(
          data.map((a) =>
            resolvedRef.current.has(a.id) ? { ...a, status: "resolved" } : a
          )
        );
      } catch (e) {
        /* keep last data */
      }
    };
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);
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
    resolvedRef.current.add(id);
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