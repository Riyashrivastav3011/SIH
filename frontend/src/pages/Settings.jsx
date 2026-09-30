import React, { useState } from "react";
import "./Cascade.css";

function Settings() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    liveUpdates: true,
    alertSound: true,
    criticalOnly: false,
    autoRefresh: true,
    compactTables: false,
    emailAlerts: true,
    maintenance: false,
    refreshRate: "10",
    timezone: "Asia/Kolkata",
  });

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="st-page">
      <header className="st-header">
        <div>
          <div className="st-breadcrumb">
            Administration <span>/</span> Settings
          </div>

          <h1>System Settings</h1>

          <p>
            Configure RailCast monitoring, notifications and operator
            preferences.
          </p>
        </div>

        <button className="st-save-top" onClick={saveSettings}>
          Save Changes
        </button>
      </header>

      {saved && (
        <div className="st-success">
          <span>✓</span>
          Settings saved successfully.
        </div>
      )}

      <div className="st-layout">
        <aside className="st-sidebar">
          <div className="st-sidebar-title">Configuration</div>

          <button className="active">
            <span>◈</span>
            General
          </button>

          <button>
            <span>◉</span>
            Notifications
          </button>

          <button>
            <span>◌</span>
            Monitoring
          </button>

          <button>
            <span>⚙</span>
            System
          </button>

          <div className="st-version">
            <span>RailCast Platform</span>
            <strong>v1.0.0</strong>
          </div>
        </aside>

        <main className="st-content">
          <section className="st-card">
            <div className="st-card-head">
              <div>
                <h2>General Preferences</h2>
                <p>Basic operator dashboard configuration.</p>
              </div>
            </div>

            <div className="st-form-grid">
              <label className="st-field">
                <span>Operator Name</span>
                <input defaultValue="Control Room Operator" />
              </label>

              <label className="st-field">
                <span>Timezone</span>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    updateSetting("timezone", e.target.value)
                  }
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                </select>
              </label>

              <label className="st-field">
                <span>Data Refresh Rate</span>
                <select
                  value={settings.refreshRate}
                  onChange={(e) =>
                    updateSetting("refreshRate", e.target.value)
                  }
                >
                  <option value="5">Every 5 seconds</option>
                  <option value="10">Every 10 seconds</option>
                  <option value="30">Every 30 seconds</option>
                  <option value="60">Every 60 seconds</option>
                </select>
              </label>

              <label className="st-field">
                <span>Dashboard Density</span>
                <select>
                  <option>Comfortable</option>
                  <option>Compact</option>
                </select>
              </label>
            </div>
          </section>

          <section className="st-card">
            <div className="st-card-head">
              <div>
                <h2>Live Monitoring</h2>
                <p>Control how real-time operational data is displayed.</p>
              </div>
            </div>

            <div className="st-option-list">
              <div className="st-option">
                <div>
                  <strong>Live train updates</strong>
                  <p>Receive real-time train position and status updates.</p>
                </div>

                <button
                  className={`st-toggle ${
                    settings.liveUpdates ? "on" : ""
                  }`}
                  onClick={() =>
                    updateSetting("liveUpdates", !settings.liveUpdates)
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="st-option">
                <div>
                  <strong>Automatic refresh</strong>
                  <p>Refresh operational data without manual interaction.</p>
                </div>

                <button
                  className={`st-toggle ${
                    settings.autoRefresh ? "on" : ""
                  }`}
                  onClick={() =>
                    updateSetting("autoRefresh", !settings.autoRefresh)
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="st-option">
                <div>
                  <strong>Compact tables</strong>
                  <p>Reduce table row spacing to display more records.</p>
                </div>

                <button
                  className={`st-toggle ${
                    settings.compactTables ? "on" : ""
                  }`}
                  onClick={() =>
                    updateSetting(
                      "compactTables",
                      !settings.compactTables
                    )
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </section>

          <section className="st-card">
            <div className="st-card-head">
              <div>
                <h2>Notifications</h2>
                <p>Configure how operational events are delivered.</p>
              </div>
            </div>

            <div className="st-option-list">
              <div className="st-option">
                <div>
                  <strong>Alert sound</strong>
                  <p>Play an audio notification for new operational alerts.</p>
                </div>

                <button
                  className={`st-toggle ${
                    settings.alertSound ? "on" : ""
                  }`}
                  onClick={() =>
                    updateSetting("alertSound", !settings.alertSound)
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="st-option">
                <div>
                  <strong>Critical alerts only</strong>
                  <p>
                    Suppress sounds for informational and low-priority events.
                  </p>
                </div>

                <button
                  className={`st-toggle ${
                    settings.criticalOnly ? "on" : ""
                  }`}
                  onClick={() =>
                    updateSetting(
                      "criticalOnly",
                      !settings.criticalOnly
                    )
                  }
                >
                  <span></span>
                </button>
              </div>

              <div className="st-option">
                <div>
                  <strong>Email notifications</strong>
                  <p>Send important operational events to registered staff.</p>
                </div>

                <button
                  className={`st-toggle ${
                    settings.emailAlerts ? "on" : ""
                  }`}
                  onClick={() =>
                    updateSetting(
                      "emailAlerts",
                      !settings.emailAlerts
                    )
                  }
                >
                  <span></span>
                </button>
              </div>
            </div>
          </section>

          <section className="st-card st-danger-card">
            <div className="st-card-head">
              <div>
                <h2>System Controls</h2>
                <p>Restricted administrative controls.</p>
              </div>
            </div>

            <div className="st-maintenance">
              <div>
                <strong>Maintenance Mode</strong>
                <p>
                  Temporarily restrict operational updates while maintenance
                  activities are performed.
                </p>
              </div>

              <button
                className={`st-toggle ${
                  settings.maintenance ? "on danger" : ""
                }`}
                onClick={() =>
                  updateSetting("maintenance", !settings.maintenance)
                }
              >
                <span></span>
              </button>
            </div>

            <div className="st-warning">
              <span>!</span>
              <p>
                Enabling maintenance mode may interrupt live monitoring for
                connected operators.
              </p>
            </div>
          </section>

          <div className="st-footer-actions">
            <button className="st-reset">Reset Defaults</button>

            <button className="st-save" onClick={saveSettings}>
              Save Configuration
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;