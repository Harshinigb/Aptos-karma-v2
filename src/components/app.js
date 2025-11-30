// app.js

// Utility to show status messages
function setStatus(msg) {
  const el = document.getElementById("status");
  el.textContent = msg || "";
}

// Format APT (1 APT = 10^8 Octas)
function formatAPT(fromOctas) {
  const APT_DECIMALS = 8;
  return (Number(fromOctas) / 10 ** APT_DECIMALS).toFixed(6);
}

// Convert APT to Octas (integer)
function aptToOctas(aptString) {
  const APT_DECIMALS = 8;
  const apt = Number(aptString);
  if (Number.isNaN(apt)) throw new Error("Invalid APT amount");
  return BigInt(Math.round(apt * 10 ** APT_DECIMALS));
}

// Global state
let currentAccount = null;
let aptos = null;

// Wait for Petra / window.aptos to be injected
async function waitForAptos(retries = 20, intervalMs = 250) {
  for (let i = 0; i < retries; i++) {
    if (window.aptos) return window.aptos;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return null;
}

window.addEventListener("DOMContentLoaded", async () => {
  const connectBtn = document.getElementById("connect-btn");
  const disconnectBtn = document.getElementById("disconnect-btn");
  const sendBtn = document.getElementById("send-btn");
  const addressEl = document.getElementById("account-address");
  const balanceEl = document.getElementById("apt-balance");
  const recipientInput = document.getElementById("recipient-input");
  const amountInput = document.getElementById("amount-input");
  const petraWarning = document.getElementById("petra-warning");

  setStatus("Checking for Petra wallet...");

  aptos = await waitForAptos();

  console.log("window.aptos after wait:", aptos);

  if (!aptos) {
    petraWarning.style.display = "block";
    connectBtn.disabled = true;
    setStatus("Petra wallet not detected.");
    return;
  }

  setStatus("Petra detected. You can connect now.");

  async function refreshBalance() {
    if (!currentAccount || !currentAccount.address) return;

    try {
      const NODE_URL = "https://api.testnet.aptoslabs.com/v1";
      const url = `${NODE_URL}/accounts/${currentAccount.address}/resources`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch resources");
      const resources = await res.json();

      const coinStore = resources.find(
        (r) =>
          r.type ===
          "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
      );
      if (!coinStore) {
        balanceEl.textContent = "0.000000 APT";
        return;
      }

      const amount = coinStore.data.coin.value;
      balanceEl.textContent = `${formatAPT(amount)} APT`;
    } catch (err) {
      console.error(err);
      setStatus("Error fetching balance.");
    }
  }

  // Connect wallet
  connectBtn.addEventListener("click", async () => {
    try {
      setStatus("Connecting to Petra...");
      const account = await aptos.connect(); // Petra prompts user
      currentAccount = account;

      addressEl.textContent = account.address;
      connectBtn.disabled = true;
      disconnectBtn.disabled = false;
      sendBtn.disabled = false;

      setStatus("Connected to Petra.");
      await refreshBalance();
    } catch (err) {
      console.error(err);
      setStatus("Connection request was rejected or failed.");
    }
  });

  // Disconnect (note: some wallets simulate disconnect)
  disconnectBtn.addEventListener("click", async () => {
    try {
      await aptos.disconnect?.(); // optional, depending on wallet implementation
    } catch (err) {
      console.warn("Disconnect not supported by wallet:", err);
    }

    currentAccount = null;
    document.getElementById("account-address").textContent = "—";
    document.getElementById("apt-balance").textContent = "—";
    connectBtn.disabled = false;
    disconnectBtn.disabled = true;
    sendBtn.disabled = true;
    setStatus("Disconnected.");
  });

  // Send APT
  sendBtn.addEventListener("click", async () => {
    if (!currentAccount) {
      setStatus("Connect wallet first.");
      return;
    }

    const recipient = recipientInput.value.trim();
    const amountApt = amountInput.value.trim();

    if (!recipient || !amountApt) {
      setStatus("Enter recipient and amount.");
      return;
    }

    let amountOctas;
    try {
      amountOctas = aptToOctas(amountApt);
    } catch (err) {
      setStatus("Invalid amount.");
      return;
    }

    const transaction = {
      type: "entry_function_payload",
      function: "0x1::aptos_account::transfer",
      type_arguments: [],
      arguments: [recipient, amountOctas.toString()],
    };

    try {
      setStatus("Sending transaction via Petra...");
      const result = await aptos.signAndSubmitTransaction(transaction);
      const txHash = result?.hash || result;
      setStatus(`Submitted! Tx hash:\n${txHash}`);
      setTimeout(refreshBalance, 4000);
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed or was rejected.");
    }
  });

  // Try auto-reconnect if already connected
  (async () => {
    try {
      const isConnected = await aptos.isConnected();
      if (isConnected) {
        const account = await aptos.account();
        currentAccount = account;
        addressEl.textContent = account.address;
        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
        sendBtn.disabled = false;
        setStatus("Already connected to Petra.");
        await refreshBalance();
      }
    } catch (err) {
      console.log("Autoconnect check failed:", err);
    }
  })();
});