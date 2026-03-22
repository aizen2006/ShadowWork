# BountyManager (Compact)

`main.compact` implements:

- **createBounty(reward, deadline)** — derives public `bountyId` = `H(creator || nonce)`; stores metadata in `Map`s; exposes `lastCreatedBountyId` and return value. **TODO:** lock native coins to match `reward`.
- **submitWork(bountyId, submissionHash)** — commit phase; `submissionHash` must be `H(solution || secret)` off-chain.
- **revealWork(bountyId, solution, secret)** — verifies `H(solution||secret)` matches the committed hash and records reveal.
- **selectWinner(bountyId, winner)** — creator only; winner must have revealed.
- **claimReward(bountyId)** — winner only; **TODO:** transfer escrowed coins.

Set `COMPACT_PATH` so `CompactStandardLibrary` resolves (see Midnight / `compactc` docs). Compile with your installed `compactc` toolchain:

```bash
# Example; exact command depends on your Midnight SDK install
compactc compile main.compact --output ./out
```

Adjust `Map` / `Set` / `ledger` assignment syntax if your compiler version differs slightly from 0.22.
