-- Backfill derived counters before making them non-null.
UPDATE "Class" c
SET "section_count" = COALESCE((
  SELECT COUNT(*)
  FROM "Section" s
  WHERE s."classId" = c.id
), 0)
WHERE c."section_count" IS NULL;

UPDATE "Class" c
SET "students_count" = COALESCE((
  SELECT COUNT(*)
  FROM "Student_in_Class" sic
  WHERE sic."classId" = c.id
), 0)
WHERE c."students_count" IS NULL;

ALTER TABLE "Class"
  ALTER COLUMN "section_count" SET DEFAULT 0,
  ALTER COLUMN "section_count" SET NOT NULL,
  ALTER COLUMN "students_count" SET DEFAULT 0,
  ALTER COLUMN "students_count" SET NOT NULL;

-- Raw Google refresh tokens remain in the existing refreshToken column, but are now optional
-- and are encrypted by the application before storage.
ALTER TABLE "User"
  ALTER COLUMN "refreshToken" DROP NOT NULL,
  ADD COLUMN "sessionTokenHash" TEXT,
  ADD COLUMN "sessionExpiresAt" TIMESTAMP(3),
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE UNIQUE INDEX "User_sessionTokenHash_key" ON "User"("sessionTokenHash");
