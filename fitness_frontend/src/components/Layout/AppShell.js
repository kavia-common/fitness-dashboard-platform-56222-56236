import React from "react";
import { NavLink } from "react-router-dom";
import "./AppShell.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/plan", label: "Plan", icon: "🗓️" },
  { to: "/log", label: "Log", icon: "✍️" },
  { to: "/progress", label: "Progress", icon: "📈" },
  { to: "/library", label: "Library", icon: "📚" },
  { to: "/account", label: "Account", icon: "👤" }
];

export default function AppShell({ headerRight, title, children }) {
  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark" aria-hidden="true">
            FD
          </div>
          <div>
            <div className="brandName">Fitness Dashboard</div>
            <div className="brandTag muted">Plan • Log • Progress</div>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
            >
              <span className="navIcon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="navLabel">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebarFooter">
          <div className="pill">Theme: Light</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="topbarTitle">{title}</div>
            <div className="topbarSubtitle muted">Stay consistent. Small wins compound.</div>
          </div>
          <div className="topbarRight">{headerRight}</div>
        </header>

        <div className="content">{children}</div>
      </main>

      <nav className="bottomNav" aria-label="Bottom navigation">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => (isActive ? "bottomItem active" : "bottomItem")}
          >
            <span className="bottomIcon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="bottomLabel">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
