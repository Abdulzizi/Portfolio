"use client";

import { useTheme } from "./ThemeProvider";

export function TopBar({
}: {
}) {
  const { theme, toggle } = useTheme();

  return (
    <div className="bar">
      <div className="name">A. J. Azizi</div>
      <div className="right">
        <div className="status">
          <span className="dot" />
          Open for work
        </div>
        <button
          className={`bar-btn ${theme === "dark" ? "active" : ""}`}
          onClick={toggle}
        >
          <span className="sw">
            <i />
          </span>
          Theme
        </button>
      </div>
    </div>
  );
}
