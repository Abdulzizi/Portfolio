"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/posts", label: "Posts" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className="admin-shell"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--paper)",
      }}
    >
      <aside
        className="admin-sidebar"
        style={{
          width: "220px",
          borderRight: "1px solid var(--line)",
          padding: "28px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div className="admin-sidebar-top">
          <div
            className="admin-brand"
            style={{
              padding: "0 20px 24px",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "-0.01em",
            }}
          >
            A. J. Azizi
          </div>
          <nav
            className="admin-nav"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="admin-nav-link"
                  aria-current={active ? "page" : undefined}
                  style={{
                    padding: "10px 20px",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: active ? "var(--accent)" : "var(--muted)",
                    background: active ? "var(--line)" : "transparent",
                    borderLeft: active
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                    textDecoration: "none",
                    transition: "color 0.15s, background 0.15s",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div
          className="admin-sidebar-bottom"
          style={{
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <a
            className="admin-view-site"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              padding: "10px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--muted)",
              background: "transparent",
              border: "1px solid var(--line)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            View site &rarr;
          </a>
          <form action={logout} className="admin-signout-form">
            <button
              type="submit"
              className="admin-signout-btn"
              style={{
                width: "100%",
                padding: "10px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                background: "transparent",
                border: "1px solid var(--line)",
                cursor: "pointer",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main
        className="admin-content"
        style={{
          flex: 1,
          minWidth: 0,
          padding: "28px 36px",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
