import React, { useEffect, useState } from "react";
import AppShell from "../components/Layout/AppShell";
import { api } from "../api/client";

const LS_KEY = "fitness_dashboard_profile_v1";

function loadLocalProfile() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { name: "Alex", email: "alex@example.com", units: "Metric" };
    return JSON.parse(raw);
  } catch {
    return { name: "Alex", email: "alex@example.com", units: "Metric" };
  }
}

function saveLocalProfile(profile) {
  localStorage.setItem(LS_KEY, JSON.stringify(profile));
}

export default function AccountPage() {
  const [profile, setProfile] = useState(loadLocalProfile());
  const [status, setStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .getMe()
      .then((data) => {
        if (cancelled) return;
        if (data?.name || data?.email) {
          const next = { ...profile, ...data };
          setProfile(next);
          saveLocalProfile(next);
        }
      })
      .catch(() => {
        /* local-only */
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    setStatus("Saving...");
    try {
      saveLocalProfile(profile);
      await api.updateMe(profile);
      setStatus("Saved");
    } catch {
      setStatus("Saved locally");
    } finally {
      window.setTimeout(() => setStatus(""), 1400);
    }
  }

  return (
    <AppShell title="Account" headerRight={status ? <span className="pill">{status}</span> : null}>
      <div className="card">
        <div className="cardHeader">
          <div style={{ fontWeight: 900 }}>Profile</div>
          <button className="btn btnPrimary" onClick={save}>
            Save
          </button>
        </div>
        <div className="cardBody">
          <div className="formRow">
            <label className="field" style={{ flex: 1 }}>
              <span className="fieldLabel muted">Name</span>
              <input
                className="input"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              />
            </label>
            <label className="field" style={{ flex: 1 }}>
              <span className="fieldLabel muted">Email</span>
              <input
                className="input"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              />
            </label>
          </div>

          <div className="formRow">
            <label className="field">
              <span className="fieldLabel muted">Units</span>
              <select
                className="input"
                value={profile.units}
                onChange={(e) => setProfile((p) => ({ ...p, units: e.target.value }))}
              >
                <option>Metric</option>
                <option>Imperial</option>
              </select>
            </label>

            <div className="field" style={{ flex: 1 }}>
              <span className="fieldLabel muted">Connected services</span>
              <div className="muted" style={{ padding: "10px 0" }}>
                Not configured in this demo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
