import { env } from "../config/env";

/**
 * Lightweight fetch wrapper for JSON APIs.
 * Uses REACT_APP_API_BASE as the base URL.
 */
async function request(path, options = {}) {
  const base = env.apiBase?.replace(/\/+$/, "") || "";
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = {
    Accept: "application/json",
    ...(options.headers || {})
  };

  const res = await fetch(url, { ...options, headers });

  // Try to parse JSON; if not JSON, surface as text
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");

  if (!res.ok) {
    const message =
      (payload && payload.message) ||
      (typeof payload === "string" && payload) ||
      `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

export const api = {
  health: () => request("/healthz"),
  // Below endpoints are optional; UI uses safe fallbacks if backend doesn't implement them.
  getMe: () => request("/api/me"),
  updateMe: (data) =>
    request("/api/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),
  getWorkoutPlan: () => request("/api/workout-plan"),
  logWorkout: (data) =>
    request("/api/workouts/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),
  logNutrition: (data) =>
    request("/api/nutrition/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }),
  getProgress: () => request("/api/progress"),
  getLibrary: () => request("/api/library")
};
