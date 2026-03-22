"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import ConnectWalletButton from "./ConnectWalletButton";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "home", label: "Feed", href: "/" },
  { name: "create", label: "Create", href: "/create" },
  { name: "leaderboard", label: "Leaderboard", href: "/leaderboard" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text-primary"
        >
          ShadowWork
        </Link>

        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-1 rounded-full border border-border bg-surface/90 px-1 py-1 shadow-sm backdrop-blur-md"
          aria-label="Main"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-surface-raised ring-1 ring-border"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </motion.nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
