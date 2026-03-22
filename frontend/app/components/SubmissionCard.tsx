"use client";

import { motion } from "motion/react";
import type { Submission } from "../lib/api";

type Props = {
  submission: Submission;
  index: number;
  showSelectWinner?: boolean;
  onSelectWinner?: () => void;
  selecting?: boolean;
};

export default function SubmissionCard({
  submission,
  index,
  showSelectWinner,
  onSelectWinner,
  selecting,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="rounded-2xl border border-border bg-surface p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-text-muted">
          Submitter #{submission.submitter_id}
        </span>
        {showSelectWinner && onSelectWinner && (
          <button
            type="button"
            disabled={selecting}
            onClick={onSelectWinner}
            className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
          >
            {selecting ? "Selecting…" : "Select winner"}
          </button>
        )}
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
        {submission.content}
      </p>
    </motion.article>
  );
}
