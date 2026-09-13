
import React from "react";
import './dashboard.css'

function Dashboardcard({ icon, value, title, message }) {
  return (
    <div className="dashboard-card">

      <div className="card-icon">
        {icon}
      </div>

      <h3>{value}</h3>

      <p className="card-title">
        {title}
      </p>

      {message && (
        <p className="login-message">
          {message}
        </p>
      )}

    </div>
  );
}

export default Dashboardcard;