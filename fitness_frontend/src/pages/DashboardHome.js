import React, { useEffect, useMemo, useState } from "react";
import AppShell from "../components/Layout/AppShell";
import Modal from "../components/Modal/Modal";
import StatCard from "../components/Widgets/StatCard";
import QuickLogCard from "../components/Widgets/QuickLogCard";
import ProgressChart from "../components/Widgets/ProgressChart";
import { loadPrefs, savePrefs } from "../state/prefs";
import { api } from "../api/client";

function makeDefaultSeries() {
  return [
    { label: "W-5", value: 52 },
    { label: "W-4", value: 58 },
    { label: "W-3", value: 61 },
    { label: "W-2", value: 64 },
    { label: "W-1", value: 68 },
    { label: "This", value: 70 }
  ];
}

export default function DashboardHome() {
  const [prefs, setPrefs] = useState(() => loadPrefs());
  const [openOnboarding, setOpenOnboarding] = useState(() => !loadPrefs().onboardingCompleted);

  const [serverStatus, setServerStatus] = useState({ ok: false, label: "Checking API..." });
  const [progressSeries, setProgressSeries] = useState(makeDefaultSeries());

  useEffect(() => {
    let cancelled = false;
    api
      .health()
      .then(() => !cancelled && setServerStatus({ ok: true, label: "API connected" }))
      .catch(() => !cancelled && setServerStatus({ ok: false, label: "API unavailable (demo mode)" }));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    api
      .getProgress()
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.series)) setProgressSeries(data.series);
      })
      .catch(() => {
        /* stay on demo series */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const headerRight = useMemo(() => {
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span className="pill" style={{ background: serverStatus.ok ? "rgba(16,185,129,0.10)" : "rgba(245,158,11,0.12)" }}>
          {serverStatus.label}
        </span>
        <button className="btn" onClick={() => setOpenOnboarding(true)}>
          Update goals
        </button>
      </div>
    );
  }, [serverStatus]);

  function completeOnboarding(goals) {
    const next = { ...prefs, onboardingCompleted: true, goals };
    setPrefs(next);
    savePrefs(next);
    setOpenOnboarding(false);
  }

  return (
    <AppShell title="Dashboard" headerRight={headerRight}>
      <div className="grid3">
        <StatCard label="Today" value="Consistency +1" hint="Log something small to keep the streak alive." tone="primary" />
        <StatCard label="Workout minutes" value="30" hint="Goal: 150/week" tone="secondary" />
        <StatCard label="Nutrition" value="On track" hint="Avg calories: 2,050" tone="accent" />
      </div>

      <div style={{ height: 16 }} />

      <div className="grid2">
        <QuickLogCard kind="workout" onLogged={() => {}} />
        <QuickLogCard kind="nutrition" onLogged={() => {}} />
      </div>

      <div style={{ height: 16 }} />

      <ProgressChart series={progressSeries} />

      <Modal
        open={openOnboarding}
        title={prefs.onboardingCompleted ? "Update your goals" : "Welcome — quick onboarding"}
        onClose={() => setOpenOnboarding(false)}
      >
        <OnboardingForm
          initial={prefs.goals}
          onCancel={() => setOpenOnboarding(false)}
          onComplete={completeOnboarding}
        />
      </Modal>
    </AppShell>
  );
}

function OnboardingForm({ initial, onCancel, onComplete }) {
  const [goal, setGoal] = useState(initial?.goal || "Build strength");
  const [days, setDays] = useState(initial?.daysPerWeek || 3);
  const [minutes, setMinutes] = useState(initial?.minutesPerWorkout || 35);

  return (
    <div>
      <div className="formRow">
        <label className="field" style={{ flex: 1 }}>
          <span className="fieldLabel muted">Primary goal</span>
          <select className="input" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option>Build strength</option>
            <option>Lose fat</option>
            <option>Increase endurance</option>
            <option>Improve mobility</option>
          </select>
        </label>

        <label className="field">
          <span className="fieldLabel muted">Days per week</span>
          <input
            className="input"
            type="number"
            min={1}
            max={7}
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="fieldLabel muted">Minutes / workout</span>
          <input
            className="input"
            type="number"
            min={10}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn btnPrimary"
          onClick={() =>
            onComplete?.({
              goal,
              daysPerWeek: Number(days),
              minutesPerWorkout: Number(minutes)
            })
          }
        >
          Save
        </button>
      </div>
    </div>
  );
}
