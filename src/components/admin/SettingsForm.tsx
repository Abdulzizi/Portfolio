"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/actions/settings";
import { useState } from "react";
import { inputStyle, labelStyle } from "./admin-styles";
import { FormStatus } from "./FormStatus";

type Props = {
  socialEmail: string;
  socialGithub: string;
  socialLinkedin: string;
};

export function SettingsForm(props: Props) {
  const [saved, setSaved] = useState(false);

  async function handleSubmit(
    _prev: { error?: string },
    formData: FormData,
  ): Promise<{ error?: string }> {
    const result = await updateSettings(formData);
    if (result?.error) return result;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    return {};
  }

  const [state, action, pending] = useActionState(handleSubmit, {});

  return (
    <form
      className="admin-form"
      action={action}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        maxWidth: "560px",
      }}
    >
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
            <input
              name="socialEmail"
              type="email"
              defaultValue={props.socialEmail}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>GitHub URL</label>
            <input
              name="socialGithub"
              type="url"
              defaultValue={props.socialGithub}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>LinkedIn URL</label>
            <input
              name="socialLinkedin"
              type="url"
              defaultValue={props.socialLinkedin}
              style={inputStyle}
            />
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
        <FormStatus saved={saved} error={state?.error} />
      </div>
    </form>
  );
}
