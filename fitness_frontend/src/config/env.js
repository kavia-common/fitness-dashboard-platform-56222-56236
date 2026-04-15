/**
 * Environment configuration for the Fitness Dashboard frontend.
 * Values come from the container .env (REACT_APP_*).
 */

function safeJsonParse(value, fallback) {
  try {
    if (!value) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export const env = {
  apiBase: process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "",
  backendUrl: process.env.REACT_APP_BACKEND_URL || "",
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || "",
  wsUrl: process.env.REACT_APP_WS_URL || "",
  nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
  healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || "/healthz",
  logLevel: process.env.REACT_APP_LOG_LEVEL || "info",
  featureFlags: safeJsonParse(process.env.REACT_APP_FEATURE_FLAGS, {}),
  experimentsEnabled: String(process.env.REACT_APP_EXPERIMENTS_ENABLED || "false") === "true"
};
