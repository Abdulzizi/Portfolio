"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useState } from "react";

const monoFont = "var(--font-geist-mono), monospace";

const toolbarButtonStyle: React.CSSProperties = {
  fontFamily: monoFont,
  fontSize: "11px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  padding: "6px 10px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "var(--line)",
  background: "var(--paper)",
  color: "var(--ink)",
  cursor: "pointer",
  lineHeight: 1,
};

const toolbarButtonActiveStyle: React.CSSProperties = {
  ...toolbarButtonStyle,
  background: "var(--ink)",
  color: "var(--paper)",
  borderColor: "var(--ink)",
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  title: string;
}) {
  return (
    <button
      className="admin-editor-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        ...(active ? toolbarButtonActiveStyle : toolbarButtonStyle),
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}

export function TipTapEditor({
  content,
  onChange,
  name = "content",
}: {
  content?: JSONContent | null;
  onChange?: (json: JSONContent) => void;
  name?: string;
}) {
  const [json, setJson] = useState<JSONContent | null>(content ?? null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write the post content...",
      }),
    ],
    content: content ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const next = editor.getJSON();
      setJson(next);
      onChange?.(next);
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    try {
      const parsed = new URL(url);
      if (!["http:", "https:", "mailto:"].includes(parsed.protocol)) {
        window.alert("Only http, https, and mailto links are allowed.");
        return;
      }
    } catch {
      window.alert("Please enter a valid URL.");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const src = window.prompt("Image URL", "https://");
    if (!src) return;
    try {
      const parsed = new URL(src);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
    } catch {
      window.alert("Please enter a valid http or https image URL.");
      return;
    }
    const alt = window.prompt(
      "Describe the image for people who cannot see it",
    );
    if (!alt?.trim()) {
      window.alert("Alternative text is required.");
      return;
    }
    editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div
        style={{
          minHeight: "300px",
          border: "1px solid var(--line)",
          padding: "14px",
          fontFamily: monoFont,
          fontSize: "12px",
          color: "var(--muted)",
        }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          padding: "10px",
          border: "1px solid var(--line)",
          borderBottom: "none",
          background: "var(--paper)",
        }}
      >
        <ToolbarButton
          label="B"
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="I"
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H2"
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          label="H3"
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
        <ToolbarButton
          label="List"
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="1. List"
          title="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Link"
          title="Link"
          active={editor.isActive("link")}
          onClick={setLink}
        />
        <ToolbarButton
          label="Image"
          title="Add image with alternative text"
          onClick={addImage}
        />
        <ToolbarButton
          label="Code"
          title="Code block"
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <ToolbarButton
          label="HR"
          title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>

      <div className="tiptap-editor-content">
        <EditorContent editor={editor} />
      </div>

      <input
        type="hidden"
        name={name}
        value={json ? JSON.stringify(json) : ""}
        readOnly
      />
    </div>
  );
}
