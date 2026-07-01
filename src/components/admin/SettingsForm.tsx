"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/actions/settings";
import { useState } from "react";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: "11px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "6px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "14px",
  border: "1px solid var(--line)",
  background: "transparent",
  color: "var(--ink)",
  fontFamily: "inherit",
  outline: "none",
  resize: "vertical" as const,
};

type Props = {
  kickerItems: string[];
  cycleWords: string[];
  marqueeItems: string[];
  availabilityText: string;
  socialEmail: string;
  socialGithub: string;
  socialLinkedin: string;
};

export function SettingsForm(props: Props) {
  const [saved, setSaved] = useState(false);

  async function handleSubmit(_prev: unknown, formData: FormData) {
    await updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    return {};
  }

  const [, action, pending] = useActionState(handleSubmit, {});

  return (
    <form
      action={action}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        maxWidth: "560px",
      }}
    >
      <div>
        <label style={labelStyle}>Hero kicker items (one per line)</label>
        <textarea
          name="kickerItems"
          rows={5}
          defaultValue={props.kickerItems.join("\n")}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Cycling words (one per line)</label>
        <textarea
          name="cycleWords"
          rows={5}
          defaultValue={props.cycleWords.join("\n")}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Marquee items (one per line)</label>
        <textarea
          name="marqueeItems"
          rows={7}
          defaultValue={props.marqueeItems.join("\n")}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Availability text</label>
        <input
          name="availabilityText"
          type="text"
          defaultValue={props.availabilityText}
          style={inputStyle}
        />
      </div>

      <div
        style={{
          borderTop: "1px solid var(--line)",
          paddingTop: "28px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "16px",
          }}
        >
          Social links
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input name="socialEmail" type="email" defaultValue={props.socialEmail} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>GitHub URL</label>
            <input name="socialGithub" type="url" defaultValue={props.socialGithub} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>LinkedIn URL</label>
            <input name="socialLinkedin" type="url" defaultValue={props.socialLinkedin} style={inputStyle} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: "12px 28px",
            fontSize: "12px",
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
          {pending ? "Saving..." : "Save settings"}
        </button>
        {saved && (
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Saved
          </span>
        )}
      </div>
    </form>
  );
}
