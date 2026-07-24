-- AlterTable
ALTER TABLE "projects" DROP COLUMN "content";

-- CreateIndex
CREATE INDEX "posts_status_published_at_idx" ON "posts"("status", "published_at");

-- CreateIndex
CREATE INDEX "projects_visibility_idx" ON "projects"("visibility");
