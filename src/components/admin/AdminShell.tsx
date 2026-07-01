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
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--paper)" }}>
      <aside
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
        <div>
          <div
            style={{
              padding: "0 20px 24px",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "-0.01em",
            }}
          >
            A. J. Azizi
          </div>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "10px 20px",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: active ? "var(--accent)" : "var(--muted)",
                    background: active ? "var(--line)" : "transparent",
                    borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
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
        <form action={logout} style={{ padding: "0 20px" }}>
          <button
            type="submit"
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
      </aside>
      <main style={{ flex: 1, padding: "28px 36px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
