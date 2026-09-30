import React from "react";
import "./Cascade.css";

const services = [
  {
    name: "Train Tracking Engine",
    description: "Processes live train position telemetry",
    status: "Operational",
    uptime: "99.98%",
    latency: "84 ms",
  },
  {
    name: "Signal Monitoring",
    description: "Monitors railway signalling infrastructure",
    status: "Operational",
    uptime: "99.95%",
    latency: "61 ms",
  },
  {
    name: "Alert Processing",
    description: "Evaluates operational events and thresholds",
    status: "Operational",
    uptime: "99.99%",
    latency: "42 ms",
  },
  {
    name: "Schedule Service",
    description: "Provides timetable and schedule information",
    status: "Operational",
    uptime: "99.97%",
    latency: "53 ms",
  },
  {
    name: "Telemetry Gateway",
    description: "Receives onboard train telemetry",
    status: "Degraded",
    uptime: "98.71%",
    latency: "219 ms",
  },
];

const nodes = [
  { name: "Delhi Control", load: 61, ping: 42 },
  { name: "Mumbai Control", load: 74, ping: 58 },
  { name: "Bhopal Control", load: 48, ping: 51 },
  { name: "Kota Control", load: 82, ping: 77 },
];

function SystemHealth() {
  return (
    <div className="sh-page">
      <header className="sh-header">
        <div>
          <div className="sh-breadcrumb">
            Administration <span>/</span> System Health
          </div>

          <h1>System Health</h1>

          <p>
            Infrastructure status, service availability and network performance.
          </p>
        </div>

        <div className="sh-global-status">
          <span></span>
          All Systems Operational
        </div>
      </header>

      <section className="sh-overview">
        <div className="sh-health-score">
          <div className="sh-score-ring">
            <div>
              <strong>98.7</strong>
              <span>HEALTH</span>
            </div>
          </div>

          <div>
            <h2>Network Health</h2>
            <p>
              Core railway monitoring services are operating within expected
              parameters.
            </p>
          </div>
        </div>

        <div className="sh-overview-item">
          <span>Services</span>
          <strong>4 / 5</strong>
          <small>Fully operational</small>
        </div>

        <div className="sh-overview-item">
          <span>API Response</span>
          <strong>64 ms</strong>
          <small className="good">Within target</small>
        </div>

        <div className="sh-overview-item">
          <span>Uptime</span>
          <strong>99.96%</strong>
          <small className="good">Last 30 days</small>
        </div>
      </section>

      <section className="sh-grid">
        <div className="sh-panel">
          <div className="sh-panel-head">
            <div>
              <h2>Service Status</h2>
              <p>RailCast platform components</p>
            </div>

            <span className="sh-updated">Updated 30 sec ago</span>
          </div>

          <div className="sh-services">
            {services.map((service) => (
              <div className="sh-service" key={service.name}>
                <div className="sh-service-indicator">
                  <span
                    className={
                      service.status === "Operational"
                        ? "operational"
                        : "degraded"
                    }
                  ></span>
                </div>

                <div className="sh-service-info">
                  <strong>{service.name}</strong>
                  <p>{service.description}</p>
                </div>

                <div className="sh-service-metric">
                  <span>Uptime</span>
                  <strong>{service.uptime}</strong>
                </div>

                <div className="sh-service-metric">
                  <span>Latency</span>
                  <strong>{service.latency}</strong>
                </div>

                <div
                  className={`sh-service-status ${
                    service.status === "Operational"
                      ? "operational"
                      : "degraded"
                  }`}
                >
                  {service.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sh-panel sh-resource-panel">
          <div className="sh-panel-head">
            <div>
              <h2>Infrastructure</h2>
              <p>Current resource utilization</p>
            </div>
          </div>

          <div className="sh-resource">
            <div className="sh-resource-top">
              <span>CPU Usage</span>
              <strong>42%</strong>
            </div>
            <div className="sh-resource-bar">
              <span style={{ width: "42%" }}></span>
            </div>
          </div>

          <div className="sh-resource">
            <div className="sh-resource-top">
              <span>Memory Usage</span>
              <strong>67%</strong>
            </div>
            <div className="sh-resource-bar">
              <span style={{ width: "67%" }}></span>
            </div>
          </div>

          <div className="sh-resource">
            <div className="sh-resource-top">
              <span>Storage</span>
              <strong>54%</strong>
            </div>
            <div className="sh-resource-bar">
              <span style={{ width: "54%" }}></span>
            </div>
          </div>

          <div className="sh-resource">
            <div className="sh-resource-top">
              <span>Network</span>
              <strong>31%</strong>
            </div>
            <div className="sh-resource-bar">
              <span style={{ width: "31%" }}></span>
            </div>
          </div>
        </div>
      </section>

      <section className="sh-panel sh-nodes-panel">
        <div className="sh-panel-head">
          <div>
            <h2>Control Nodes</h2>
            <p>Regional infrastructure performance</p>
          </div>
        </div>

        <div className="sh-node-grid">
          {nodes.map((node) => (
            <div className="sh-node" key={node.name}>
              <div className="sh-node-head">
                <div>
                  <span className="sh-node-dot"></span>
                  <strong>{node.name}</strong>
                </div>

                <span>Online</span>
              </div>

              <div className="sh-node-stat">
                <div>
                  <label>Load</label>
                  <b>{node.load}%</b>
                </div>

                <div className="sh-node-progress">
                  <span style={{ width: `${node.load}%` }}></span>
                </div>
              </div>

              <div className="sh-node-footer">
                <span>Latency</span>
                <strong>{node.ping} ms</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sh-panel sh-events">
        <div className="sh-panel-head">
          <div>
            <h2>Recent System Events</h2>
            <p>Latest infrastructure activity</p>
          </div>
        </div>

        <div className="sh-event-row">
          <span className="sh-event-icon success">✓</span>
          <div>
            <strong>Telemetry gateway recovered</strong>
            <p>Connection latency returned to normal range.</p>
          </div>
          <time>6 min ago</time>
        </div>

        <div className="sh-event-row">
          <span className="sh-event-icon info">i</span>
          <div>
            <strong>System health check completed</strong>
            <p>All critical service dependencies responded successfully.</p>
          </div>
          <time>18 min ago</time>
        </div>

        <div className="sh-event-row">
          <span className="sh-event-icon warning">!</span>
          <div>
            <strong>Telemetry latency increased</strong>
            <p>Average gateway response crossed the warning threshold.</p>
          </div>
          <time>34 min ago</time>
        </div>
      </section>
    </div>
  );
}

export default SystemHealth;