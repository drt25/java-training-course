(function () {
  let timers = [];
  let simActive = false;

  function clearTimers() {
    simActive = false;
    timers.forEach(clearTimeout);
    timers = [];
  }

  function later(fn, ms) {
    const id = setTimeout(() => {
      if (!simActive) return;
      fn();
    }, ms);
    timers.push(id);
  }

  function reduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function startPath(root) {
    const nodes = Array.from(root.querySelectorAll("[data-hop]"));
    const fill = root.querySelector(".sb-rail-fill");
    if (!nodes.length) return;
    if (reduced()) {
      nodes.forEach((node) => node.classList.add("is-on"));
      if (fill) fill.style.width = "100%";
      return;
    }

    function play() {
      if (!simActive) return;
      nodes.forEach((node) => node.classList.remove("is-on"));
      if (fill) fill.style.width = "0%";
      nodes.forEach((node, index) => {
        later(() => {
          node.classList.add("is-on");
          if (fill) fill.style.width = ((index + 1) / nodes.length) * 100 + "%";
        }, 260 + index * 520);
      });
      later(play, 1100 + nodes.length * 520);
    }

    play();
  }

  const STORIES = [
    {
      request: "POST /api/auth/register",
      check: "This address is open.",
      controller: "Creates the account",
      code: "201",
      result: "Registered",
      caption: "Registration passes through Spring Security and reaches the controller.",
      stopAt: 4
    },
    {
      request: "GET /api/users/profile",
      check: "No password. 401.",
      controller: "Does not run",
      code: "401",
      result: "Unauthorized",
      caption: "Profile has no password, so Spring Security stops the call. The controller stays dark.",
      stopAt: 2
    }
  ];

  function showGate(slide) {
    const root = slide.querySelector("[data-demo='gate']");
    if (!root) return;
    const hops = Array.from(root.querySelectorAll("[data-gate-hop]"));
    const fill = root.querySelector("[data-gate-fill]");
    const request = root.querySelector("[data-gate-request]");
    const check = root.querySelector("[data-gate-check]");
    const controller = root.querySelector("[data-gate-controller]");
    const code = root.querySelector("[data-gate-code]");
    const result = root.querySelector("[data-gate-result-text]");
    const caption = root.querySelector("[data-gate-caption]");
    let index = 0;

    function apply(story, upTo) {
      if (request) request.textContent = story.request;
      if (check) check.textContent = story.check;
      if (controller) controller.textContent = story.controller;
      if (code) code.textContent = story.code;
      if (result) result.textContent = story.result;
      if (caption) caption.textContent = story.caption;
      hops.forEach((hop, hopIndex) => {
        const step = hopIndex + 1;
        hop.classList.toggle("is-on", step <= upTo);
        hop.classList.toggle("is-stop", story.stopAt < hops.length && step === story.stopAt && upTo >= story.stopAt);
        hop.classList.toggle("is-dim", step > story.stopAt);
      });
      if (fill) fill.style.width = (upTo / hops.length) * 100 + "%";
    }

    if (reduced()) {
      apply(STORIES[1], 2);
      return;
    }

    function play() {
      if (!simActive) return;
      const story = STORIES[index % STORIES.length];
      index += 1;
      hops.forEach((hop) => hop.classList.remove("is-on", "is-stop", "is-dim"));
      if (fill) fill.style.width = "0%";
      if (request) request.textContent = story.request;
      if (check) check.textContent = story.check;
      if (controller) controller.textContent = story.controller;
      if (code) code.textContent = story.code;
      if (result) result.textContent = story.result;
      if (caption) caption.textContent = story.caption;
      for (let step = 1; step <= story.stopAt; step += 1) {
        later(() => apply(story, step), 260 + (step - 1) * 560);
      }
      later(play, 1400 + story.stopAt * 560);
    }

    play();
  }

  function showHash(slide) {
    const root = slide.querySelector("[data-demo='hash']");
    if (!root) return;
    const cell = root.querySelector("[data-hash-cell]");
    const caption = root.querySelector("[data-hash-caption]");
    if (!cell || !caption) return;
    const hashCaption = "MySQL stores the hash. Login sends john123 again so matches can compare them.";

    if (reduced()) {
      cell.textContent = "$2a$10$...";
      cell.classList.add("is-hash");
      caption.textContent = hashCaption;
      return;
    }

    function play() {
      if (!simActive) return;
      cell.textContent = "john123";
      cell.classList.remove("is-hash");
      caption.textContent = "The typed password is sitting in the table.";
      later(() => {
        cell.textContent = "$2a$10$...";
        cell.classList.add("is-hash");
        caption.textContent = hashCaption;
      }, 1400);
      later(play, 4600);
    }

    play();
  }

  function onShow(event) {
    const slide = event.detail && event.detail.slide;
    if (!slide) return;
    clearTimers();
    simActive = true;
    slide.querySelectorAll("[data-demo='paths'] .sb-path").forEach(startPath);
    showGate(slide);
    showHash(slide);
  }

  window.addEventListener("lesson-slide-show", onShow);
  onShow({ detail: { slide: document.querySelector("#lesson-slides > .slide.active") } });
})();
