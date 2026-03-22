"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { motion } from "motion/react";
import GradientBlob from "../../components/GradientBlob";
import StatusBadge from "../../components/StatusBadge";
import SubmissionCard from "../../components/SubmissionCard";
import SubmissionForm from "../../components/SubmissionForm";
import { useWallet } from "../../context/wallet-context";
import { useApi } from "../../hooks/use-api";
import {
  fetchBounty,
  fetchSubmissions,
  selectWinner,
} from "../../lib/api";
import { formatDeadline, formatReward } from "../../lib/utils";

export default function BountyDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { userId } = useWallet();
  const [selectingId, setSelectingId] = useState<number | null>(null);

  const bountyQuery = useApi(
    Number.isFinite(id) ? `bounty-${id}` : "bounty-invalid",
    useCallback(() => {
      if (!Number.isFinite(id)) throw new Error("Invalid id");
      return fetchBounty(id);
    }, [id]),
  );

  const subsQuery = useApi(
    Number.isFinite(id) ? `subs-${id}` : "subs-invalid",
    useCallback(() => {
      if (!Number.isFinite(id)) throw new Error("Invalid id");
      return fetchSubmissions(id);
    }, [id]),
  );

  const bounty = bountyQuery.data;
  const isCreator = userId != null && bounty && userId === bounty.creator_id;

  async function handleSelectWinner(submissionId: number) {
    if (!bounty || userId == null) return;
    setSelectingId(submissionId);
    try {
      await selectWinner({
        bounty_id: bounty.id,
        creator_id: userId,
        submission_id: submissionId,
      });
      await Promise.all([bountyQuery.refetch(), subsQuery.refetch()]);
    } finally {
      setSelectingId(null);
    }
  }

  if (!Number.isFinite(id)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-text-secondary">
        Invalid bounty.
      </div>
    );
  }

  if (bountyQuery.isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24">
        <div className="h-48 animate-pulse rounded-2xl bg-surface-raised/60" />
      </div>
    );
  }

  if (bountyQuery.error || !bounty) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-text-secondary">
          {bountyQuery.error?.message ?? "Bounty not found."}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-accent"
        >
          Back to feed
        </Link>
      </div>
    );
  }

  const submissions = subsQuery.data ?? [];

  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-28">
      <GradientBlob className="left-1/2 top-0 -translate-x-1/2" variant="subtle" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl border border-border bg-surface p-8 shadow-sm"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={bounty.status} />
          <span className="font-mono text-lg font-medium text-accent">
            {formatReward(bounty.reward)}
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">
          {bounty.title}
        </h1>
        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-text-secondary">
          {bounty.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6 text-sm text-text-muted">
          <span>Deadline {formatDeadline(bounty.deadline)}</span>
          <span className="font-mono">Creator #{bounty.creator_id}</span>
        </div>
      </motion.div>

      <section className="relative mt-12">
        <h2 className="font-display text-xl font-semibold text-text-primary">
          Submissions
        </h2>
        {subsQuery.isLoading ? (
          <div className="mt-6 space-y-4">
            {[1, 2].map((k) => (
              <div
                key={k}
                className="h-28 animate-pulse rounded-2xl bg-surface-raised/50"
              />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">
            No submissions yet. Be the first.
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {submissions.map((s, i) => (
              <li key={s.id}>
                <SubmissionCard
                  submission={s}
                  index={i}
                  showSelectWinner={
                    bounty.status === "open" && Boolean(isCreator)
                  }
                  selecting={selectingId === s.id}
                  onSelectWinner={() => void handleSelectWinner(s.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {bounty.status === "open" && !isCreator && (
        <section className="relative mt-12">
          <SubmissionForm
            bountyId={bounty.id}
            onSubmitted={() => void subsQuery.refetch()}
          />
        </section>
      )}
    </div>
  );
}
