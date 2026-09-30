import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <main className="dashboard">

      {/* Welcome Section */}
      <section className="welcome-card">
        <div className="welcome-content">
          <span className="eyebrow">DYNAMIC ETA FORECASTING</span>

          <h1>Real-time railway intelligence</h1>

          <p>
            Monitor train movements, predicted arrival times, delays and
            network conditions from one intelligent dashboard.
          </p>
        </div>

        <div className="welcome-icon">
          🚆
        </div>
      </section>


      {/* Metrics */}
      <section className="metric-grid">

        <div className="metric-card">
          <div className="metric-top">
            <span>Active Trains</span>
            <div className="metric-icon blue">🚆</div>
          </div>

          <h2>128</h2>

          <p className="positive">
            ↑ 8.4% <span>vs yesterday</span>
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span>On Schedule</span>
            <div className="metric-icon green">✓</div>
          </div>

          <h2>84%</h2>

          <p className="positive">
            ↑ 2.1% <span>today</span>
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span>Delayed Trains</span>
            <div className="metric-icon orange">!</div>
          </div>

          <h2>17</h2>

          <p className="negative">
            ↑ 3 trains <span>last hour</span>
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span>Prediction Accuracy</span>
            <div className="metric-icon purple">AI</div>
          </div>

          <h2>94.7%</h2>

          <p className="positive">
            ↑ 1.8% <span>this week</span>
          </p>
        </div>

      </section>


      {/* Main Dashboard */}
      <section className="dashboard-grid">

        {/* Live Trains */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <span className="panel-label">LIVE MONITORING</span>
              <h2>Train Movement</h2>
            </div>

            <button className="view-btn">
              View all →
            </button>
          </div>


          <div className="train-list">

            <div className="train-row">

              <div className="train-number">
                <strong>12001</strong>
                <span>Shatabdi Express</span>
              </div>

              <div className="route">
                <strong>NDLS</strong>
                <span>→</span>
                <strong>CNB</strong>
              </div>

              <div className="train-eta">
                <small>ETA</small>
                <strong>14:42</strong>
              </div>

              <span className="badge delayed">
                +6 min
              </span>

            </div>


            <div className="train-row">

              <div className="train-number">
                <strong>12951</strong>
                <span>Mumbai Rajdhani</span>
              </div>

              <div className="route">
                <strong>MMCT</strong>
                <span>→</span>
                <strong>NDLS</strong>
              </div>

              <div className="train-eta">
                <small>ETA</small>
                <strong>18:18</strong>
              </div>

              <span className="badge delayed">
                +12 min
              </span>

            </div>


            <div className="train-row">

              <div className="train-number">
                <strong>12430</strong>
                <span>Lucknow Mail</span>
              </div>

              <div className="route">
                <strong>NDLS</strong>
                <span>→</span>
                <strong>LKO</strong>
              </div>

              <div className="train-eta">
                <small>ETA</small>
                <strong>22:05</strong>
              </div>

              <span className="badge early">
                -2 min
              </span>

            </div>


            <div className="train-row">

              <div className="train-number">
                <strong>12034</strong>
                <span>Shatabdi Express</span>
              </div>

              <div className="route">
                <strong>NDLS</strong>
                <span>→</span>
                <strong>AGC</strong>
              </div>

              <div className="train-eta">
                <small>ETA</small>
                <strong>16:21</strong>
              </div>

              <span className="badge ontime">
                On time
              </span>

            </div>

          </div>

        </div>


        {/* Recent Events */}
        <div className="panel">

          <div className="panel-header">

            <div>
              <span className="panel-label">
                SYSTEM ACTIVITY
              </span>

              <h2>Recent Events</h2>
            </div>

          </div>


          <div className="events">

            <div className="event">
              <div className="event-icon blue">
                AI
              </div>

              <div>
                <strong>ETA prediction updated</strong>
                <p>Train 12001 · 2 min ago</p>
              </div>
            </div>


            <div className="event">
              <div className="event-icon orange">
                !
              </div>

              <div>
                <strong>Delay detected</strong>
                <p>Train 12951 · 7 min ago</p>
              </div>
            </div>


            <div className="event">
              <div className="event-icon green">
                ✓
              </div>

              <div>
                <strong>Train reached station</strong>
                <p>Train 12034 · 12 min ago</p>
              </div>
            </div>


            <div className="event">
              <div className="event-icon purple">
                ◎
              </div>

              <div>
                <strong>Network data synchronized</strong>
                <p>All zones · 18 min ago</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* Performance */}
      <section className="panel performance-panel">

        <div className="panel-header">

          <div>
            <span className="panel-label">
              NETWORK PERFORMANCE
            </span>

            <h2>Today's Operations</h2>
          </div>

          <button className="view-btn">
            Detailed analytics →
          </button>

        </div>


        <div className="performance-grid">

          <div className="performance-item">
            <span>Average Delay</span>
            <strong>7.4 min</strong>

            <div className="progress">
              <span style={{ width: "32%" }}></span>
            </div>
          </div>


          <div className="performance-item">
            <span>Predictions Generated</span>
            <strong>4,821</strong>

            <div className="progress">
              <span style={{ width: "78%" }}></span>
            </div>
          </div>


          <div className="performance-item">
            <span>Stations Monitored</span>
            <strong>246</strong>

            <div className="progress">
              <span style={{ width: "61%" }}></span>
            </div>
          </div>


          <div className="performance-item">
            <span>Data Reliability</span>
            <strong>98.2%</strong>

            <div className="progress">
              <span style={{ width: "92%" }}></span>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
};

export default Home;