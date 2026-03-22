"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { createSubmission } from "../lib/api";
import { useWallet } from "../context/wallet-context";

type Props = {
  bountyId: number;
  onSubmitted: () => void;
};

export default function SubmissionForm({ bountyId, onSubmitted }: Props) {
  const { userId, connected } = useWallet();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!userId) {
      setError("Connect your wallet to submit.");
      return;
    }
    if (!content.trim()) {
      setError("Enter your solution or link.");
      return;
    }
    setSubmitting(true);
    try {
      await createSubmission({
        bounty_id: bountyId,
        submitter_id: userId,
        content: content.trim(),
      });
      setContent("");
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (!connected) {
    return (
      <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary">
        Connect your wallet to submit a response.
      </p>
    );
  }

  if (userId == null) {
    return (
      <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-text-primary">
        Syncing your account… reconnect if this persists.
      </p>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6"
    >
      <h3 className="font-display text-lg font-semibold text-text-primary">
        Submit your solution
      </h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        placeholder="Describe your approach, or paste links to repos / demos."
        className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none ring-accent/30 focus:ring-2"
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-accent-secondary px-5 py-2.5 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Submit response"}
      </button>
    </motion.form>
  );
}
