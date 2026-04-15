import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardHome from "./pages/DashboardHome";
import WorkoutPlan from "./pages/WorkoutPlan";
import LogPage from "./pages/Log";
import ProgressPage from "./pages/Progress";
import LibraryPage from "./pages/Library";
import AccountPage from "./pages/Account";

/**
 * Root app component. Provides routing for the dashboard pages.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/plan" element={<WorkoutPlan />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route
          path="*"
          element={
            <div className="containerMax" style={{ padding: 18 }}>
              <div className="card">
                <div className="cardHeader">
                  <div style={{ fontWeight: 900 }}>Not found</div>
                </div>
                <div className="cardBody">
                  The page you are looking for does not exist. Use the navigation to continue.
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
