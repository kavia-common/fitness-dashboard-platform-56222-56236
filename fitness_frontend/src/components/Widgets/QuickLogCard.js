import React, { useMemo, useState } from "react";
import { api } from "../../api/client";
import "./widgets.css";

export default function QuickLogCard({ kind, onLogged }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [durationMin, setDurationMin] = useState(30);
  const [calories, setCalories] = useState(600);

  const title = useMemo(() => {
    if (kind === "workout") return "Quick Workout Log";
    return "Quick Nutrition Log";
  }, [kind]);

  async function submit() {
    setLoading(true);
    setError("");
    try {
      if (kind === "workout") {
        await api.logWorkout({
          type: "Workout",
          durationMin: Number(durationMin),
          note
        });
      } else {
        await api.logNutrition({
          calories: Number(calories),
          note
        });
      }
      setNote("");
      onLogged?.();
    } catch (e) {
      setError(e?.message || "Failed to log");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="cardHeader">
        <div style={{ fontWeight: 850 }}>{title}</div>
        <span className="pill">{kind === "workout" ? "Workout" : "Nutrition"}</span>
      </div>
      <div className="cardBody">
        <div className="formRow">
          {kind === "workout" ? (
            <>
              <label className="field">
                <span className="fieldLabel muted">Duration (min)</span>
                <input
                  className="input"
                  type="number"
                  min={5}
                  step={5}
                  value={durationMin}
                  onChange={(e) => setDurationMin(e.target.value)}
                />
              </label>
            </>
          ) : (
            <label className="field">
              <span className="fieldLabel muted">Calories</span>
              <input
                className="input"
                type="number"
                min={0}
                step={50}
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </label>
          )}
          <label className="field" style={{ flex: 1 }}>
            <span className="fieldLabel muted">Note</span>
            <input
              className="input"
              placeholder="Optional note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>

        {error ? <div className="errorBanner">{error}</div> : null}

        <button className="btn btnPrimary" disabled={loading} onClick={submit}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
