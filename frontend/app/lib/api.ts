const base = () =>
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
  "http://localhost:3001";

export type Bounty = {
  id: number;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  creator_id: number;
  status: "open" | "closed";
};

export type Submission = {
  id: number;
  bounty_id: number;
  submitter_id: number;
  content: string;
  created_at?: string;
};

export type UserRow = {
  id: number;
  wallet_address: string;
  anon_id: string;
  created_at: string;
};

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return {} as T;
  }
}

export async function registerUser(wallet_address: string) {
  const res = await fetch(`${base()}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet_address }),
  });
  const data = await parseJson<{
    data?: UserRow;
    message?: string;
  }>(res);
  if (res.status === 409) {
    return getUserByWallet(wallet_address);
  }
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data.data!;
}

export async function getUserByWallet(wallet_address: string): Promise<UserRow> {
  const url = `${base()}/user?wallet_address=${encodeURIComponent(wallet_address)}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await parseJson<{ data?: Partial<UserRow>; message?: string }>(
    res,
  );
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  const d = data.data;
  if (!d?.anon_id || d.id == null) {
    throw new Error("Invalid user response");
  }
  return {
    id: d.id,
    wallet_address: d.wallet_address ?? wallet_address,
    anon_id: d.anon_id,
    created_at: d.created_at ?? "",
  };
}

export async function fetchBounties(): Promise<Bounty[]> {
  const res = await fetch(`${base()}/bounties`, { cache: "no-store" });
  const data = await parseJson<{ data?: Bounty[]; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data.data ?? [];
}

export async function fetchBounty(id: number): Promise<Bounty> {
  const res = await fetch(`${base()}/bounty/${id}`, { cache: "no-store" });
  const data = await parseJson<{ data?: Bounty; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  if (!data.data) throw new Error("Bounty not found");
  return data.data;
}

export async function createBounty(body: {
  title: string;
  description: string;
  reward: number;
  deadline: string;
  creator_id: number;
}): Promise<Bounty> {
  const res = await fetch(`${base()}/bounty`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ data?: Bounty; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  if (!data.data) throw new Error("Create failed");
  return data.data;
}

export async function fetchSubmissions(bountyId: number): Promise<Submission[]> {
  const res = await fetch(`${base()}/bounty/${bountyId}/submissions`, {
    cache: "no-store",
  });
  const data = await parseJson<{ data?: Submission[]; message?: string }>(res);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data.data ?? [];
}

export async function createSubmission(body: {
  bounty_id: number;
  submitter_id: number;
  content: string;
}): Promise<Submission> {
  const res = await fetch(`${base()}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{ data?: Submission; message?: string }>(res);
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  if (!data.data) throw new Error("Submission failed");
  return data.data;
}

export async function selectWinner(body: {
  bounty_id: number;
  creator_id: number;
  submission_id: number;
}) {
  const res = await fetch(`${base()}/select-winner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson<{
    data?: { bounty_id: number; winner_anon_id: string; status: string };
    message?: string;
  }>(res);
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data.data!;
}
