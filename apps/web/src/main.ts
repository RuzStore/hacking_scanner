import "./style.css";

const tokenInput = document.querySelector<HTMLInputElement>("#token");
const scanButton = document.querySelector<HTMLButtonElement>("#scan");
const result = document.querySelector<HTMLElement>("#result");

const apiBase = "http://localhost:3000";

scanButton?.addEventListener("click", async () => {
  const token = tokenInput?.value.trim();

  if (!token) {
    if (result) result.textContent = "Masukkan token.";
    return;
  }

  if (token.length > 512) {
    if (result) result.textContent = "Token terlalu panjang.";
    return;
  }

  try {
    const response = await fetch(
      `${apiBase}/api/scan/${encodeURIComponent(token)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Request gagal");
    }

    if (result) {
      result.textContent = JSON.stringify(data, null, 2);
    }
  } catch (error) {
    if (result) {
      result.textContent =
        error instanceof Error ? error.message : "Terjadi kesalahan.";
    }
  }
});
