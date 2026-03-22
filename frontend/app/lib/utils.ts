export function truncateAddress(address: string, head = 8, tail = 6) {
  if (address.length <= head + tail + 1) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

export function formatReward(amount: number, currency = "ADA") {
  return `${amount.toLocaleString()} ${currency}`;
}

export function formatDeadline(isoOrRaw: string) {
  const d = new Date(isoOrRaw);
  if (Number.isNaN(d.getTime())) return isoOrRaw;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncateText(text: string, max = 140) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}
