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

  // Motion demo: replays the brand's settle and roll moves.
  const play = document.getElementById("sg-motion-play");
  if (play) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!window.gsap || reduced) {
      play.disabled = true;
      document.getElementById("sg-motion-note").textContent = reduced
        ? "Your device asks for reduced motion, so the demo is turned off."
        : "The animation library did not load.";
    } else {
      const { gsap } = window;
      const run = () =>
        gsap.timeline()
          .from(".sg-md-pkg", { y: -70, rotation: "+=10", autoAlpha: 0, duration: 1.1, ease: "back.out(1.5)", stagger: 0.14 })
          .to(".sg-md-pkg", { rotation: "+=1.6", duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: 1 })
          .from(".sg-md-tile", { x: -80, rotation: -120, scale: 0.8, autoAlpha: 0, duration: 1.1, ease: "back.out(1.5)" }, 0.3);
      let tl = null;
      play.addEventListener("click", () => {
        if (tl) tl.progress(1).kill();
        gsap.set(".sg-md-pkg, .sg-md-tile", { clearProps: "opacity,visibility" });
        tl = run();
      });
    }
  }
})();
