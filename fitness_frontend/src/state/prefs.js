const KEY = "fitness_dashboard_prefs_v1";

export function loadPrefs() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { onboardingCompleted: false, goals: null };
    const parsed = JSON.parse(raw);
    return {
      onboardingCompleted: Boolean(parsed.onboardingCompleted),
      goals: parsed.goals || null
    };
  } catch {
    return { onboardingCompleted: false, goals: null };
  }
}

export function savePrefs(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
}
