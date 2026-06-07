(function () {
  const tool = document.querySelector("[data-upi-tool]");
  if (!tool) return;

  const form = tool.querySelector("[data-upi-form]");
  const qrEl = tool.querySelector("[data-qr]");
  const output = tool.querySelector("[data-intent-output]");
  const errorEl = tool.querySelector("[data-error]");
  const copyBtn = tool.querySelector("[data-copy]");
  const openUpiBtn = tool.querySelector("[data-open-upi]");
  const openBtn = tool.querySelector("[data-open-full]");
  const downloadBtn = tool.querySelector("[data-download]");
  const mode = tool.dataset.mode || "default";
  const upiIdPattern = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z][a-zA-Z0-9._-]{2,64}$/;

  let latestIntent = "";
  let qrInstance = null;

  function clean(value, maxLength) {
    return String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);
  }

  function trackToolEvent(name, params = {}) {
    if (typeof gtag !== "function") return;
    gtag("event", name, {
      page_path: window.location.pathname,
      tool_mode: mode,
      ...params
    });
  }

  function values() {
    const data = new FormData(form);
    const amount = mode === "static" || mode === "shop" ? "" : clean(data.get("amount"), 16);
    return {
      payeeName: clean(data.get("payeeName"), 80),
      upiId: clean(data.get("upiId"), 320),
      amount,
      note: clean(data.get("note"), 80)
    };
  }

  function validate(next) {
    if (!next.payeeName) return "Enter the payee or merchant name.";
    if (!next.upiId) return "Enter a UPI ID / VPA.";
    if (!upiIdPattern.test(next.upiId)) return "Enter a valid UPI ID, for example name@upi.";
    if ((mode === "amount" || mode === "invoice") && !next.amount) return "Enter the fixed amount for this QR.";
    if (next.amount) {
      const parsed = Number(next.amount);
      if (!Number.isFinite(parsed) || parsed <= 0) return "Amount must be greater than 0.";
      if (parsed > 200000) return "Use an amount of 200000 INR or less.";
    }
    return "";
  }

  function buildIntent(next) {
    const params = [
      ["pa", next.upiId, true],
      ["pn", next.payeeName]
    ];
    if (next.amount) params.push(["am", Number(next.amount).toFixed(2)]);
    if (next.note) params.push(["tn", next.note]);
    params.push(["cu", "INR"]);
    return `upi://pay?${params.map(([key, value, preserveAt]) => {
      const encoded = encodeURIComponent(value);
      return `${key}=${preserveAt ? encoded.replace(/%40/g, "@") : encoded}`;
    }).join("&")}`;
  }

  function setPlaceholder(message) {
    latestIntent = "";
    qrInstance = null;
    qrEl.innerHTML = `<div class="qr-placeholder">${message}</div>`;
    output.textContent = "upi://pay?... will appear here";
    copyBtn.disabled = true;
    openUpiBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;
  }

  function renderQr(intent) {
    qrEl.innerHTML = "";
    qrInstance = new QRCode(qrEl, {
      text: intent,
      width: 220,
      height: 220,
      colorDark: "#111827",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
    latestIntent = intent;
    output.textContent = intent;
    copyBtn.disabled = false;
    openUpiBtn.disabled = false;
    if (downloadBtn) downloadBtn.disabled = false;
  }

  function updateOpenLink(next) {
    const params = new URLSearchParams();
    if (next.payeeName) params.set("payeeName", next.payeeName);
    if (next.upiId) params.set("upiId", next.upiId);
    if (next.amount) params.set("amount", next.amount);
    if (next.note) params.set("note", next.note);
    openBtn.href = `/${params.toString() ? `?${params.toString()}#generator` : "#generator"}`;
  }

  function generate() {
    if (typeof QRCode === "undefined") {
      errorEl.textContent = "QR library is still loading. Please try again in a moment.";
      return;
    }

    const next = values();
    updateOpenLink(next);
    const error = validate(next);
    errorEl.textContent = error;
    if (error) {
      setPlaceholder("Enter valid UPI details to generate the QR.");
      return;
    }

    renderQr(buildIntent(next));
    trackToolEvent("generate_qr", {
      has_amount: Boolean(next.amount),
      has_note: Boolean(next.note)
    });
  }

  function getQrCanvas() {
    return qrEl.querySelector("canvas");
  }

  function safeFileName(next) {
    return (next.payeeName || "upi-qr")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "upi-qr";
  }

  function downloadQrPng() {
    if (!latestIntent) return;
    const canvas = getQrCanvas();
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${safeFileName(values())}-upi-qr.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    trackToolEvent("download_qr", {
      download_target: "qr_only",
      file_format: "png"
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generate();
  });

  form.addEventListener("input", () => updateOpenLink(values()));

  copyBtn.addEventListener("click", async () => {
    if (!latestIntent) return;
    try {
      await navigator.clipboard.writeText(latestIntent);
      copyBtn.textContent = "Copied";
      window.setTimeout(() => { copyBtn.textContent = "Copy UPI Link"; }, 1400);
    } catch {
      output.focus();
    }
    trackToolEvent("copy_upi_link");
  });

  openUpiBtn.addEventListener("click", () => {
    if (!latestIntent) return;
    trackToolEvent("open_upi_app");
    window.location.href = latestIntent;
  });

  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadQrPng);
  }

  updateOpenLink(values());
  setPlaceholder("Enter details, then generate your UPI QR.");
})();
