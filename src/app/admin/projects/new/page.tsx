import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
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
        Projects
      </div>
      <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 36px" }}>
        New project
      </h1>
      <ProjectForm />
    </div>
  );
}
