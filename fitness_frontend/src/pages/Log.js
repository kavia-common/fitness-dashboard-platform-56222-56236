import React, { useState } from "react";
import AppShell from "../components/Layout/AppShell";
import QuickLogCard from "../components/Widgets/QuickLogCard";

export default function LogPage() {
  const [toast, setToast] = useState("");

  function onLogged() {
    setToast("Saved!");
    window.setTimeout(() => setToast(""), 1400);
  }

  return (
    <AppShell title="Log" headerRight={toast ? <span className="pill">{toast}</span> : null}>
      <div className="grid2">
        <QuickLogCard kind="workout" onLogged={onLogged} />
        <QuickLogCard kind="nutrition" onLogged={onLogged} />
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 850 }}>Tips</div>
          <span className="pill">Consistency</span>
        </div>
        <div className="cardBody">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Log the minimum: 5 minutes counts.</li>
            <li>Prefer trends over single-day perfection.</li>
            <li>Increase difficulty only when recovery is good.</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
