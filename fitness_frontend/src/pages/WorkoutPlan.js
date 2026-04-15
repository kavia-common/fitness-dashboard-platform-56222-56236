import React, { useEffect, useState } from "react";
import AppShell from "../components/Layout/AppShell";
import { api } from "../api/client";

function fallbackPlan() {
  return {
    title: "Starter Strength + Cardio",
    weeks: [
      { day: "Mon", focus: "Strength A", items: ["Squat 3x5", "Bench 3x5", "Row 3x8"] },
      { day: "Tue", focus: "Cardio", items: ["Zone 2 walk 35 min", "Stretch 10 min"] },
      { day: "Wed", focus: "Strength B", items: ["Deadlift 3x5", "Press 3x5", "Pull-down 3x10"] },
      { day: "Thu", focus: "Mobility", items: ["Hip + ankle mobility", "Core 12 min"] },
      { day: "Fri", focus: "Strength A", items: ["Squat 3x5", "Bench 3x5", "Row 3x8"] },
      { day: "Sat", focus: "Optional", items: ["Easy cardio 25 min", "Stretch 10 min"] },
      { day: "Sun", focus: "Rest", items: ["Walk", "Recover", "Sleep"] }
    ]
  };
}

export default function WorkoutPlan() {
  const [plan, setPlan] = useState(fallbackPlan());
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .getWorkoutPlan()
      .then((data) => {
        if (cancelled) return;
        if (data?.title && Array.isArray(data?.weeks)) setPlan(data);
      })
      .catch((e) => setError(e?.message || "Using demo plan"));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppShell title="Workout Plan" headerRight={error ? <span className="pill">{error}</span> : null}>
      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 900 }}>{plan.title}</div>
          <span className="pill">Weekly</span>
        </div>
        <div className="cardBody" style={{ display: "grid", gap: 12 }}>
          {plan.weeks.map((d) => (
            <div
              key={d.day}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: 14,
                padding: 12,
                display: "grid",
                gap: 8
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <div style={{ fontWeight: 850 }}>
                  {d.day} — {d.focus}
                </div>
                <span className="pill">Session</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--color-text)" }}>
                {d.items.map((it) => (
                  <li key={it} style={{ marginBottom: 4 }}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
