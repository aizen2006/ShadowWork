"use client";

import { motion } from "motion/react";

export type LeaderboardRow = {
  rank: number;
  anon_id: string;
  wins: number;
  total_submissions: number;
  earnings: number;
};

type Props = {
  rows: LeaderboardRow[];
};

export default function LeaderboardTable({ rows }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-raised/80">
            <th className="px-5 py-4 font-medium text-text-muted">#</th>
            <th className="px-5 py-4 font-medium text-text-muted">Anon ID</th>
            <th className="px-5 py-4 font-medium text-text-muted">Wins</th>
            <th className="px-5 py-4 font-medium text-text-muted">
              Submissions
            </th>
            <th className="px-5 py-4 font-medium text-text-muted">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.anon_id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="border-b border-border/80 last:border-0"
            >
              <td className="px-5 py-4 font-mono text-text-secondary">
                {row.rank}
              </td>
              <td className="max-w-[12rem] truncate px-5 py-4 font-mono text-xs text-text-primary">
                {row.anon_id}
              </td>
              <td className="px-5 py-4 tabular-nums text-text-primary">
                {row.wins}
              </td>
              <td className="px-5 py-4 tabular-nums text-text-secondary">
                {row.total_submissions}
              </td>
              <td className="px-5 py-4 font-medium tabular-nums text-accent">
                {row.earnings.toLocaleString()} ADA
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
