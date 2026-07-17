import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { TaskList } from "@/components/admin/TaskList";
import { requirePageAuth } from "@/lib/auth";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePageAuth();

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: { orderBy: { createdAt: "asc" } } },
  });

  if (!project) notFound();

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
        Projects / Edit
      </div>
      <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 36px" }}>
        {project.name}
      </h1>
      <ProjectForm project={project} />
      <TaskList tasks={project.tasks} projectId={project.id} />
    </div>
  );
}
