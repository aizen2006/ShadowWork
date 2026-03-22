"use client";

import { motion } from "motion/react";
import LeaderboardTable, {
  type LeaderboardRow,
} from "../components/LeaderboardTable";
import GradientBlob from "../components/GradientBlob";

const demoRows: LeaderboardRow[] = [
  {
    rank: 1,
    anon_id: "kQ7mNp2vLx9wR4tY8zA3bC6d",
    wins: 14,
    total_submissions: 52,
    earnings: 12800,
  },
  {
    rank: 2,
    anon_id: "pL9nW5jH2fE8sQ1vX4yZ7aB0c",
    wins: 11,
    total_submissions: 38,
    earnings: 9200,
  },
  {
    rank: 3,
    anon_id: "mR3tY6uI9oP2qS5vW8xZ1bN4a",
    wins: 9,
    total_submissions: 41,
    earnings: 7100,
  },
  {
    rank: 4,
    anon_id: "cD8fG1hJ4kL7mN0pQ3rS6tU9v",
    wins: 7,
    total_submissions: 29,
    earnings: 5400,
  },
  {
    rank: 5,
    anon_id: "xY2zA5bC8dE1fG4hI7jK0lM3n",
    wins: 6,
    total_submissions: 24,
    earnings: 4100,
  },
];

export default function LeaderboardPage() {
  return (
    <div className="relative mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-10 sm:px-6">
      <GradientBlob className="left-0 top-20 -translate-x-1/3" variant="subtle" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative text-center"
      >
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Leaderboard
        </h1>
        <p className="mt-3 text-text-secondary">
          Anonymous standings by wins and earnings. Reputation API is coming
          soon — this table uses demo data.
        </p>
      </motion.div>
      <div className="relative mt-12">
        <LeaderboardTable rows={demoRows} />
      </div>
    </div>
  );
}
