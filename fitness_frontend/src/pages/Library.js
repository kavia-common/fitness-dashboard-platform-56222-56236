import React, { useEffect, useMemo, useState } from "react";
import AppShell from "../components/Layout/AppShell";
import { api } from "../api/client";

const demoItems = [
  { title: "Squat", type: "Exercise", tag: "Strength", desc: "Build legs + core. Focus on depth and bracing." },
  { title: "Zone 2 Cardio", type: "Session", tag: "Endurance", desc: "Easy pace. You can talk in full sentences." },
  { title: "Protein Basics", type: "Guide", tag: "Nutrition", desc: "Aim for 1.6–2.2g/kg body weight/day." },
  { title: "Sleep Checklist", type: "Guide", tag: "Recovery", desc: "Consistent schedule, cool room, low caffeine late." }
];

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(demoItems);
  const [info, setInfo] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .getLibrary()
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.items)) setItems(data.items);
      })
      .catch(() => setInfo("Demo library"));

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => `${it.title} ${it.type} ${it.tag} ${it.desc}`.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <AppShell
      title="Library"
      headerRight={
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {info ? <span className="pill">{info}</span> : null}
          <input
            className="input"
            style={{ width: 260 }}
            placeholder="Search library..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      }
    >
      <div className="grid2">
        {filtered.map((it) => (
          <div key={it.title} className="card">
            <div className="cardHeader">
              <div>
                <div style={{ fontWeight: 900 }}>{it.title}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                  {it.type} • {it.tag}
                </div>
              </div>
              <span className="pill">Save</span>
            </div>
            <div className="cardBody">
              <div style={{ lineHeight: 1.55 }}>{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
