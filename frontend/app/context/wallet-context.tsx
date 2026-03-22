"use client";

import "@midnight-ntwrk/dapp-connector-api";
import type { InitialAPI } from "@midnight-ntwrk/dapp-connector-api";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { registerUser } from "../lib/api";

type WalletContextValue = {
  connected: boolean;
  walletAddress: string | null;
  userId: number | null;
  anonId: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [anonId, setAnonId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const wallet: InitialAPI = await window.midnight!.mnLace;
      const connectedApi = await wallet.connect("preprod");
      const addresses = await connectedApi.getShieldedAddresses();
      const address = addresses.shieldedAddress;
      const connectionStatus = await connectedApi.getConnectionStatus();

      if (connectionStatus) {
        setWalletAddress(address);
        setConnected(true);
        try {
          const user = await registerUser(address);
          setUserId(user.id);
          setAnonId(user.anon_id);
        } catch (e) {
          console.error("User registration failed:", e);
          setUserId(null);
          setAnonId(null);
        }
      }
    } catch {
      /* connection failed */
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setWalletAddress(null);
    setUserId(null);
    setAnonId(null);
  }, []);

  const value = useMemo(
    () => ({
      connected,
      walletAddress,
      userId,
      anonId,
      isConnecting,
      connect,
      disconnect,
    }),
    [
      connected,
      walletAddress,
      userId,
      anonId,
      isConnecting,
      connect,
      disconnect,
    ],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return ctx;
}
