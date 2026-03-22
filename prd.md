# 🧠 PROJECT: ShadowWork  
## Anonymous Skill Arena + Bounty Marketplace

---

# 🎯 CORE IDEA

A platform where users solve real-world tasks and compete for rewards — **anonymously**, where skill is the only signal.

---

# 💡 PRODUCT VISION

- Remove bias (college, name, background)  
- Reward actual ability  
- Make freelancing competitive + fun  
- Enable privacy-first work using Midnight  

---

# 🧩 CORE USER FLOWS

## 👤 Bounty Creator Flow

1. Create bounty  
   - Title  
   - Description  
   - Reward  
   - Deadline  

2. Publish challenge  
3. Review submissions  
4. Select winner  

---

## 🧠 Participant Flow

1. Browse bounties  
2. Join challenge  
3. Submit solution  
4. Wait for result  
5. Earn reward + reputation  

---

## 🏆 Reputation Flow

- Wins  
- Earnings  
- Skill tags  

👉 Builds anonymous credibility

---

# 🔥 MVP FEATURES

## MUST HAVE

- Wallet authentication  
- Create bounty  
- View bounty feed  
- Submit solution  
- Select winner  
- Leaderboard  

---

## NICE TO HAVE

- AI evaluation  
- Auto scoring  
- Categories  

---

# 🏗️ ARCHITECTURE


Frontend (Next.js + React)↓
Wallet Auth (wagmi)
        ↓
Backend (ElysiaJS)
        ↓
PostgreSQL (Drizzle)
        ↓
Midnight (ZK + Privacy - optional/mock)
        ↓
AI Layer (OpenAI)

---

# 🧱 DATABASE SCHEMA

## 🧑 users
- id  
- wallet_address  
- anon_id  
- created_at  

---

## 🧾 bounties
- id  
- title  
- description  
- reward  
- deadline  
- created_by (anon_id)  
- status (open/closed)  

---

## 📥 submissions
- id  
- bounty_id  
- submitted_by (anon_id)  
- content (text/link)  
- created_at  

---

## 🏆 winners
- bounty_id  
- winner_anon_id  

---

## 📊 reputation
- anon_id  
- wins  
- total_submissions  
- earnings  

---

# 🔐 IDENTITY SYSTEM

- Wallet connect → authentication  
- Generate anon_id  
- Use anon_id everywhere  

👉 No emails  
👉 No usernames  
👉 Fully anonymous  

---

# 📆 PHASE-WISE BUILD PLAN

---

## 🥇 PHASE 1: SETUP + AUTH (4–6 hrs)

### Tasks:
- Setup Next.js + ElysiaJS  
- Setup PostgreSQL + Drizzle  
- Implement wallet auth  
- Generate anon_id  

### Output:
User connects wallet → gets anon_id  

---

## 🥈 PHASE 2: BOUNTY SYSTEM (6–8 hrs)

### Backend APIs:
- POST /bounty  
- GET /bounties  
- GET /bounty/:id  

### Frontend:
- Feed page  
- Create bounty form  

### Output:
Users can create + view bounties  

---

## 🥉 PHASE 3: SUBMISSIONS (5–7 hrs)

### Backend APIs:
- POST /submission  
- GET /bounty/:id/submissions  

### Frontend:
- Submit solution form  
- Display submissions  

### Output:
Users can participate  

---

## 🏅 PHASE 4: WINNER SELECTION (4–5 hrs)

### Backend API:
- POST /select-winner  

### Logic:
- Only creator can select winner  
- Mark bounty as closed  
- Update winner  

### Output:
Winner gets reward  

---

## 🏆 PHASE 5: REPUTATION SYSTEM (4 hrs)

### Logic:
- wins++  
- earnings += reward  

### Frontend:
- Leaderboard  
- User stats  

### Output:
Users build credibility  

---

## 🤖 PHASE 6: AI LAYER (Optional)

### Features:
- Rank submissions  
- Suggest best candidate  
- Summarize solutions  

### Output:
Adds intelligence + wow factor  

---

## 🔐 PHASE 7: MIDNIGHT INTEGRATION

### For Hackathon:
- Simulate:
  - private submissions  
  - ZK proofs  

### UI Label:
“This action is verified using zero-knowledge proof”

### Output:
Strong privacy narrative  

---

# 🎨 UI PAGES

- `/` → Bounty feed  
- `/create` → Create bounty  
- `/bounty/[id]` → Details + submissions  
- `/leaderboard`  

---

# 🎤 DEMO FLOW

1. Connect wallet  
2. Create bounty  
3. Show submissions  
4. Select winner  
5. Show leaderboard  

---

# ⚠️ RISKS & SOLUTIONS

| Risk | Solution |
|------|---------|
| Low excitement | Add competitive elements |
| Hard judging | Allow manual selection |
| Spam submissions | Add small entry stake |
| Multiple accounts | Future ZK identity |

---

# 🔥 FINAL POSITIONING

“ShadowWork is a privacy-first platform where users earn rewards by solving real-world tasks anonymously, with skill—not identity—determining success.”

---