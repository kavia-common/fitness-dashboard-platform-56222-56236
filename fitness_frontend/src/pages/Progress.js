import React, { useEffect, useState } from "react";
import AppShell from "../components/Layout/AppShell";
import StatCard from "../components/Widgets/StatCard";
import ProgressChart from "../components/Widgets/ProgressChart";
import { api } from "../api/client";

function demoSeries() {
  return [
    { label: "W-5", value: 45 },
    { label: "W-4", value: 49 },
    { label: "W-3", value: 55 },
    { label: "W-2", value: 57 },
    { label: "W-1", value: 62 },
    { label: "This", value: 66 }
  ];
}

export default function ProgressPage() {
  const [series, setSeries] = useState(demoSeries());
  const [summary, setSummary] = useState({ streak: 6, workouts: 4, sleep: "7h 20m" });
  const [info, setInfo] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .getProgress()
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.series)) setSeries(data.series);
        if (data?.summary) setSummary(data.summary);
      })
      .catch(() => setInfo("Demo data"));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppShell title="Progress" headerRight={info ? <span className="pill">{info}</span> : null}>
      <div className="grid3">
        <StatCard label="Streak" value={`${summary.streak} days`} hint="Keep a small daily habit." tone="primary" />
        <StatCard label="Workouts (week)" value={`${summary.workouts}`} hint="Target: 3–5" tone="secondary" />
        <StatCard label="Sleep avg" value={`${summary.sleep}`} hint="Recovery drives adaptation." tone="accent" />
      </div>

      <div style={{ height: 16 }} />

      <ProgressChart series={series} />

      <div style={{ height: 16 }} />

      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 850 }}>Notes</div>
          <span className="pill">Coach</span>
        </div>
        <div className="cardBody">
          <div className="muted" style={{ lineHeight: 1.55 }}>
            If fatigue rises, reduce volume for a week. If progress stalls for 2+ weeks, add 5–10% volume
            or 1 extra easy cardio session.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
