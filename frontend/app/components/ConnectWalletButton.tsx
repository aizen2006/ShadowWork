"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useWallet } from "../context/wallet-context";
import { truncateAddress } from "../lib/utils";

export default function ConnectWalletButton() {
  const {
    connected,
    walletAddress,
    isConnecting,
    connect,
    disconnect,
  } = useWallet();
  const reduceMotion = useReducedMotion();

  const spring = reduceMotion
    ? { duration: 0.2 }
    : { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.85 };

  const tapScale = reduceMotion ? 1 : 0.96;

  return (
    <div className="flex items-center justify-end">
      <AnimatePresence mode="wait" initial={false}>
        {!connected || !walletAddress ? (
          <motion.button
            key="connect"
            type="button"
            disabled={isConnecting}
            onClick={() => void connect()}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
            transition={spring}
            whileHover={
              reduceMotion || isConnecting ? undefined : { scale: 1.03 }
            }
            whileTap={{ scale: isConnecting ? 1 : tapScale }}
            className="relative overflow-hidden rounded-full border border-border bg-surface-raised/80 px-4 py-2 text-sm font-medium text-text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-surface-raised disabled:pointer-events-none disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isConnecting && (
                <motion.span
                  className="inline-block size-3.5 rounded-full border-2 border-border-bright border-t-accent"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { repeat: Infinity, duration: 0.7, ease: "linear" }
                  }
                  aria-hidden
                />
              )}
              {isConnecting ? "Connecting…" : "Connect Wallet"}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="connected"
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={spring}
            className="flex items-center gap-1 rounded-full border border-accent-secondary/35 bg-accent-secondary/10 py-1 pl-3 pr-1 shadow-lg backdrop-blur-md"
          >
            <motion.span
              layout
              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                ...spring,
                delay: reduceMotion ? 0 : 0.05,
              }}
              className="flex items-center gap-2"
            >
              <motion.span
                className="size-2 shrink-0 rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.15, 1], opacity: [1, 0.85, 1] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                }
                aria-hidden
              />
              <span
                className="max-w-[11rem] truncate font-mono text-xs font-medium tracking-tight text-text-primary sm:text-sm"
                title={walletAddress}
              >
                {truncateAddress(walletAddress)}
              </span>
            </motion.span>
            <motion.button
              type="button"
              onClick={disconnect}
              whileHover={reduceMotion ? undefined : { scale: 1.06 }}
              whileTap={{ scale: tapScale }}
              transition={spring}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
              aria-label="Disconnect wallet"
            >
              Disconnect
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
