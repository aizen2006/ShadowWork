import { motion } from "motion/react";

type Props = {
  status: "open" | "closed";
};

export default function StatusBadge({ status }: Props) {
  const open = status === "open";
  return (
    <motion.span
      layout
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide ${
        open
          ? "bg-accent-secondary/15 text-accent-secondary ring-1 ring-accent-secondary/30"
          : "bg-text-muted/20 text-text-secondary ring-1 ring-border"
      }`}
    >
      {open ? "Open" : "Closed"}
    </motion.span>
  );
}
