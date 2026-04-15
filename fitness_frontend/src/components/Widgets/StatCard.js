import React from "react";
import "./widgets.css";

export default function StatCard({ label, value, hint, tone = "primary" }) {
  return (
    <div className={`statCard stat-${tone}`}>
      <div className="statLabel">{label}</div>
      <div className="statValue">{value}</div>
      {hint ? <div className="statHint muted">{hint}</div> : null}
    </div>
  );
}
