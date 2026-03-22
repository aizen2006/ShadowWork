"use client";

import { fetchBounties } from "../lib/api";
import { useApi } from "../hooks/use-api";
import BountyCard from "./BountyCard";
import EmptyState from "./EmptyState";
import Link from "next/link";

export default function BountyFeed() {
  const { data, error, isLoading, refetch } = useApi("bounties", fetchBounties);

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-2xl border border-border bg-surface-raised/50"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Couldn’t load bounties"
        description={error.message}
        action={
          <button
            type="button"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-stone-950"
            onClick={() => void refetch()}
          >
            Retry
          </button>
        }
      />
    );
  }

  const list = data ?? [];
  if (list.length === 0) {
    return (
      <EmptyState
        title="No bounties yet"
        description="Be the first to post a challenge and attract anonymous talent."
        action={
          <Link
            href="/create"
            className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90"
          >
            Create a bounty
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((bounty, index) => (
        <BountyCard key={bounty.id} bounty={bounty} index={index} />
      ))}
    </div>
  );
}
