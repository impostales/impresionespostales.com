-- Add quote status to support admin review workflow
CREATE TYPE "QuoteStatus" AS ENUM ('pending', 'reviewed');

ALTER TABLE "QuoteSubmission"
ADD COLUMN "status" "QuoteStatus" NOT NULL DEFAULT 'pending';

CREATE INDEX "QuoteSubmission_status_idx" ON "QuoteSubmission"("status");
