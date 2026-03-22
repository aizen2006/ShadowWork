type Props = {
  className?: string;
  variant?: "hero" | "subtle";
};

export default function GradientBlob({
  className = "",
  variant = "hero",
}: Props) {
  const opacity = variant === "hero" ? "opacity-40 dark:opacity-35" : "opacity-25";
  return (
    <div
      className={`pointer-events-none absolute -z-10 blur-3xl filter ${opacity} ${className}`}
      aria-hidden
    >
      <div
        className="size-[min(90vw,42rem)] rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--accent)_0%,transparent_55%)]"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        className="absolute left-1/3 top-1/4 size-[min(70vw,28rem)] rounded-full bg-[radial-gradient(circle_at_70%_60%,var(--accent-secondary)_0%,transparent_50%)] opacity-80"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}
