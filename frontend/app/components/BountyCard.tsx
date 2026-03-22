"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Bounty } from "../lib/api";
import { formatDeadline, formatReward, truncateText } from "../lib/utils";
import StatusBadge from "./StatusBadge";

type Props = {
  bounty: Bounty;
  index: number;
};

export default function BountyCard({ bounty, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm ring-1 ring-transparent transition-[box-shadow] hover:border-border-bright hover:shadow-lg hover:ring-border/50"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <StatusBadge status={bounty.status} />
        <span className="font-mono text-xs text-accent tabular-nums">
          {formatReward(bounty.reward)}
        </span>
      </div>

      <Link href={`/bounty/${bounty.id}`} className="block flex-1">
        <h2 className="font-display text-lg font-semibold tracking-tight text-text-primary transition-colors group-hover:text-accent">
          {bounty.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">
          {truncateText(bounty.description, 160)}
        </p>
      </Link>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-text-muted">
        <span>Due {formatDeadline(bounty.deadline)}</span>
        <span className="font-mono text-text-secondary">
          Creator #{bounty.creator_id}
        </span>
      </div>
    </motion.article>
  );
}
