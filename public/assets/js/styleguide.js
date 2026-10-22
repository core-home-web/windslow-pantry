// Winslow Pantry style guide: color vision preview and copy-to-clipboard swatches.
(() => {
  const buttons = document.querySelectorAll("[data-cvd]");
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      const mode = b.dataset.cvd;
      if (mode) document.documentElement.dataset.cvd = mode;
      else delete document.documentElement.dataset.cvd;
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    })
  );

  document.querySelectorAll("[data-copy]").forEach((b) =>
    b.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copy);
        b.dataset.copied = "";
        setTimeout(() => delete b.dataset.copied, 1400);
      } catch {}
    })
  );
})();
