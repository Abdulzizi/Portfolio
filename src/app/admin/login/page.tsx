"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div
      className="admin-login"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--paper)",
        padding: "28px",
      }}
    >
      <form
        className="admin-login-card"
        action={action}
        style={{
          width: "100%",
          maxWidth: "360px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "8px",
            }}
          >
            Admin
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Sign in
          </h1>
        </div>

        {state?.error && (
          <div
            className="admin-login-error"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              color: "var(--danger)",
              padding: "10px 14px",
              border: "1px solid var(--danger)",
            }}
          >
            {state.error}
          </div>
        )}

        <div
          className="admin-login-field"
          style={{ display: "flex", flexDirection: "column", gap: "6px" }}
        >
          <label
            htmlFor="email"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{
              padding: "12px 14px",
              fontSize: "15px",
              border: "1px solid var(--line)",
              background: "transparent",
              color: "var(--ink)",
              fontFamily: "inherit",
              outline: "none",
            }}
          />
        </div>

        <div
          className="admin-login-field"
          style={{ display: "flex", flexDirection: "column", gap: "6px" }}
        >
          <label
            htmlFor="password"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{
              padding: "12px 14px",
              fontSize: "15px",
              border: "1px solid var(--line)",
              background: "transparent",
              color: "var(--ink)",
              fontFamily: "inherit",
              outline: "none",
            }}
          />
        </div>

        <button
          className="admin-login-submit"
          type="submit"
          disabled={pending}
          style={{
            padding: "14px",
            fontSize: "13px",
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: "var(--ink)",
            color: "var(--paper)",
            border: "none",
            cursor: pending ? "wait" : "pointer",
            opacity: pending ? 0.6 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
