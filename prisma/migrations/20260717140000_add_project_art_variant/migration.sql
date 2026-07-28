ALTER TABLE "projects" ADD COLUMN "art_variant" INTEGER;

ALTER TABLE "projects"
ADD CONSTRAINT "projects_art_variant_range"
CHECK ("art_variant" IS NULL OR "art_variant" BETWEEN 0 AND 5);
