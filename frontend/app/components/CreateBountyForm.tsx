"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { createBounty } from "../lib/api";
import { useWallet } from "../context/wallet-context";

export default function CreateBountyForm() {
  const router = useRouter();
  const { userId, connected } = useWallet();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!userId) {
      setError("Connect your wallet first.");
      return;
    }
    const rewardNum = Number(reward);
    if (!title.trim() || !description.trim() || !deadline) {
      setError("Fill in all fields.");
      return;
    }
    if (!Number.isFinite(rewardNum) || rewardNum <= 0) {
      setError("Enter a valid reward amount.");
      return;
    }
    const iso = new Date(deadline).toISOString();
    setSubmitting(true);
    try {
      const bounty = await createBounty({
        title: title.trim(),
        description: description.trim(),
        reward: rewardNum,
        deadline: iso,
        creator_id: userId,
      });
      router.push(`/bounty/${bounty.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create bounty");
    } finally {
      setSubmitting(false);
    }
  }

  if (!connected) {
    return (
      <p className="rounded-2xl border border-border bg-surface px-6 py-8 text-center text-text-secondary">
        Connect your wallet to create a bounty.
      </p>
    );
  }

  if (userId == null) {
    return (
      <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-8 text-center text-sm text-text-primary">
        Registering your account… try again in a moment, or reconnect your
        wallet.
      </p>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={(e) => void handleSubmit(e)}
      className="mx-auto max-w-xl space-y-6 rounded-2xl border border-border bg-surface p-8 shadow-sm"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-text-secondary"
        >
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none ring-accent/30 transition-shadow focus:ring-2"
          placeholder="e.g. Ship a privacy-preserving leaderboard API"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-text-secondary"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none ring-accent/30 transition-shadow focus:ring-2"
          placeholder="Scope, acceptance criteria, links…"
          required
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="reward"
            className="block text-sm font-medium text-text-secondary"
          >
            Reward (ADA)
          </label>
          <input
            id="reward"
            type="number"
            min={1}
            step={1}
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none ring-accent/30 transition-shadow focus:ring-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-text-secondary"
          >
            Deadline
          </label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none ring-accent/30 transition-shadow focus:ring-2"
            required
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Publishing…" : "Publish bounty"}
      </button>
    </motion.form>
  );
}
