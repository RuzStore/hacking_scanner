// apps/web/src/main.ts
import "./style.css";

const tokenInput = document.querySelector<HTMLInputElement>("#token");
const scanButton = document.querySelector<HTMLButtonElement>("#scan");
const result = document.querySelector<HTMLElement>("#result");

const apiBase = "http://localhost:3000"; // ⚠️ DEV ONLY — bukan production URL

function showResult(message: unknown) {
  if (!result) return;
  result.textContent =
    typeof message === "string" ? message : JSON.stringify(message, null, 2);
}

scanButton?.addEventListener("click", async () => {
  const profileId = tokenInput?.value.trim();

  if (!profileId) {
    showResult("Masukkan profile ID.");
    return;
  }

  if (profileId.length > 100) {
    showResult("Profile ID terlalu panjang (maks 100 karakter).");
    return;
  }

  scanButton.disabled = true;
  showResult("Memproses...");

  try {
    const response = await fetch(`${apiBase}/api/tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Request gagal.");
    }

    showResult(data);
  } catch (error) {
    showResult(
      error instanceof Error ? error.message : "Terjadi kesalahan jaringan."
    );
  } finally {
    scanButton.disabled = false;
  }
});
