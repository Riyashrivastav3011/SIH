import React, { useMemo, useState } from "react";
import "./Cascade.css";

const weeklyData = [
  { day: "Mon", trains: 184, onTime: 91, delay: 12 },
  { day: "Tue", trains: 201, onTime: 94, delay: 9 },
  { day: "Wed", trains: 196, onTime: 89, delay: 15 },
  { day: "Thu", trains: 218, onTime: 95, delay: 8 },
  { day: "Fri", trains: 224, onTime: 92, delay: 11 },
  { day: "Sat", trains: 176, onTime: 96, delay: 6 },
  { day: "Sun", trains: 163, onTime: 93, delay: 8 },
];

const routePerformance = [
  {
    route: "Delhi — Mumbai",
    trains: 48,
    punctuality: 94,
    avgDelay: "7 min",
    status: "stable",
  },
  {
    route: "Delhi — Bhopal",
    trains: 36,
    punctuality: 91,
    avgDelay: "10 min",
    status: "stable",
  },
  {
    route: "Mumbai — Ahmedabad",
    trains: 31,
    punctuality: 88,
    avgDelay: "14 min",
    status: "watch",
  },
  {
    route: "Delhi — Jaipur",
    trains: 27,
    punctuality: 96,
    avgDelay: "5 min",
    status: "stable",
  },
  {
    route: "Bhopal — Nagpur",
    trains: 22,
    punctuality: 86,
    avgDelay: "17 min",
    status: "watch",
  },
];

function Analytics() {
  const [period, setPeriod] = useState("7D");

  const maxTrains = useMemo(
    () => Math.max(...weeklyData.map((item) => item.trains)),
    []
  );

  return (
    <div className="an-page">
      <header className="an-header">
        <div>
          <div className="an-breadcrumb">
            Operations <span>/</span> Analytics
          </div>

          <h1>Network Analytics</h1>

          <p>
            Operational performance, punctuality and traffic intelligence.
          </p>
        </div>

        <div className="an-period">
          {["24H", "7D", "30D"].map((item) => (
            <button
              key={item}
              className={period === item ? "active" : ""}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      <section className="an-kpi-grid">
        <div className="an-kpi">
          <div className="an-kpi-icon blue">↗</div>
          <span>Network Punctuality</span>
          <strong>92.8%</strong>
          <small className="positive">+2.4% vs previous period</small>
        </div>

        <div className="an-kpi">
          <div className="an-kpi-icon green">✓</div>
          <span>Trains Monitored</span>
          <strong>1,362</strong>
          <small>Across all active zones</small>
        </div>

        <div className="an-kpi">
          <div className="an-kpi-icon orange">◷</div>
          <span>Average Delay</span>
          <strong>10.7 min</strong>
          <small className="positive">−1.8 min improvement</small>
        </div>

        <div className="an-kpi">
          <div className="an-kpi-icon purple">◆</div>
          <span>Network Load</span>
          <strong>78%</strong>
          <small>Within operating capacity</small>
        </div>
      </section>

      <section className="an-main-grid">
        <div className="an-panel an-traffic-panel">
          <div className="an-panel-head">
            <div>
              <h2>Train Movement</h2>
              <p>Daily monitored train activity</p>
            </div>

            <span className="an-live-label">
              <i></i> LIVE DATA
            </span>
          </div>

          <div className="an-chart">
            <div className="an-y-axis">
              <span>240</span>
              <span>180</span>
              <span>120</span>
              <span>60</span>
              <span>0</span>
            </div>

            <div className="an-bars">
              {[...weeklyData].map((item) => (
                <div className="an-bar-column" key={item.day}>
                  <div className="an-bar-value">{item.trains}</div>

                  <div className="an-bar-track">
                    <div
                      className="an-bar"
                      style={{
                        height: `${(item.trains / maxTrains) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="an-panel an-punctuality-panel">
          <div className="an-panel-head">
            <div>
              <h2>Punctuality</h2>
              <p>Network performance</p>
            </div>
          </div>

          <div className="an-donut">
            <div className="an-donut-inner">
              <strong>92.8%</strong>
              <span>ON TIME</span>
            </div>
          </div>

          <div className="an-legend">
            <div>
              <span className="dot ontime"></span>
              <label>On schedule</label>
              <strong>92.8%</strong>
            </div>

            <div>
              <span className="dot delayed"></span>
              <label>Delayed</label>
              <strong>7.2%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="an-bottom-grid">
        <div className="an-panel">
          <div className="an-panel-head">
            <div>
              <h2>Route Performance</h2>
              <p>Top monitored corridors</p>
            </div>
          </div>

          <div className="an-table-wrap">
            <table className="an-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Trains</th>
                  <th>Punctuality</th>
                  <th>Avg Delay</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {routePerformance.map((route) => (
                  <tr key={route.route}>
                    <td className="an-route">{route.route}</td>
                    <td>{route.trains}</td>
                    <td>
                      <div className="an-progress-cell">
                        <div className="an-progress">
                          <span
                            style={{ width: `${route.punctuality}%` }}
                          ></span>
                        </div>
                        <b>{route.punctuality}%</b>
                      </div>
                    </td>
                    <td>{route.avgDelay}</td>
                    <td>
                      <span className={`an-status ${route.status}`}>
                        {route.status === "stable" ? "Stable" : "Watch"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="an-panel an-insight-panel">
          <div className="an-panel-head">
            <div>
              <h2>Operational Insights</h2>
              <p>Automatically detected patterns</p>
            </div>
          </div>

          <div className="an-insight">
            <span className="an-insight-icon blue">↗</span>
            <div>
              <strong>Performance improving</strong>
              <p>Network punctuality increased by 2.4%.</p>
            </div>
          </div>

          <div className="an-insight">
            <span className="an-insight-icon orange">!</span>
            <div>
              <strong>High delay corridor</strong>
              <p>Bhopal — Nagpur is averaging 17 minutes delay.</p>
            </div>
          </div>

          <div className="an-insight">
            <span className="an-insight-icon green">✓</span>
            <div>
              <strong>Capacity available</strong>
              <p>Current network load remains below threshold.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;