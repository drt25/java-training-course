(function () {
  const RANK = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4 };
  const CAPTION = {
    TRACE: "TRACE shows every message.",
    DEBUG: "DEBUG hides TRACE.",
    INFO: "INFO hides DEBUG and TRACE.",
    WARN: "WARN keeps warnings and errors.",
    ERROR: "ERROR keeps only failures.",
  };

  function applyLevel(root, level) {
    const threshold = RANK[level];
    root.querySelectorAll("[data-rank]").forEach((line) => {
      line.classList.toggle("is-off", Number(line.dataset.rank) < threshold);
    });
    root.querySelectorAll("[data-level]").forEach((btn) => {
      const on = btn.dataset.level === level;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const caption = root.querySelector(".log-caption");
    if (caption) caption.textContent = CAPTION[level] || "";
  }

  function bindLevels(root) {
    if (root.dataset.bound) return;
    root.dataset.bound = "true";
    root.querySelectorAll("[data-level]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        applyLevel(root, btn.dataset.level);
      });
    });
  }

  function showLevels(slide) {
    const root = slide.querySelector("[data-demo='levels']");
    if (!root) return;
    bindLevels(root);
    applyLevel(root, "INFO");
  }

  function onShow(event) {
    const slide = event.detail && event.detail.slide;
    if (!slide) return;
    showLevels(slide);
  }

  window.addEventListener("lesson-slide-show", onShow);
  onShow({ detail: { slide: document.querySelector("#lesson-slides > .slide.active") } });
})();
