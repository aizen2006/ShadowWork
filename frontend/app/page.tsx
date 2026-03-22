import BountyFeed from "./components/BountyFeed";
import GradientBlob from "./components/GradientBlob";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <section className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6">
        <GradientBlob className="left-1/2 top-0 -translate-x-1/2" />
        <div className="relative max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-secondary">
            Midnight · Anonymous arena
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Bounties without bias.
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-secondary">
            Browse open challenges, submit solutions under your anon ID, and let
            skill be the only signal.
          </p>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-24 sm:px-6">
        <h2 className="mb-8 font-display text-xl font-semibold text-text-primary">
          Open bounties
        </h2>
        <BountyFeed />
      </section>
    </div>
  );
}
