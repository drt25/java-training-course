(function () {
  let timers = [];
  let simActive = false;
  let lastSlide = null;

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

  function light(nodes) {
    nodes.forEach((node, index) => {
      later(() => node.classList.add("is-on"), 220 + index * 380);
    });
  }

  function startSteps(slide) {
    const root = slide.querySelector("[data-demo='steps']");
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll("[data-step]"));
    if (!nodes.length) return;
    if (reduced()) {
      nodes.forEach((node) => node.classList.add("is-on"));
      return;
    }
    nodes.forEach((node) => node.classList.remove("is-on"));
    light(nodes);
  }

  function startChain(slide, name) {
    const root = slide.querySelector("[data-demo='" + name + "']");
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll("[data-step], [data-hop]"));
    if (!nodes.length) return;
    if (reduced()) {
      nodes.forEach((node) => node.classList.add("is-on"));
      return;
    }

    function play() {
      if (!simActive) return;
      nodes.forEach((node) => node.classList.remove("is-on"));
      nodes.forEach((node, index) => {
        later(() => node.classList.add("is-on"), 240 + index * 380);
      });
      later(play, 800 + nodes.length * 380);
    }

    play();
  }

  function onShow(event) {
    const slide = event.detail && event.detail.slide;
    if (!slide || slide === lastSlide) return;
    lastSlide = slide;
    clearTimers();
    simActive = true;
    startSteps(slide);
    startChain(slide, "flow");
    startChain(slide, "life");
  }

  document.querySelectorAll("#lesson-slides > .slide").forEach((slide) => {
    const observer = new MutationObserver(() => {
      if (slide.classList.contains("active")) onShow({ detail: { slide: slide } });
    });
    observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
  });

  window.addEventListener("lesson-slide-show", onShow);
  onShow({ detail: { slide: document.querySelector("#lesson-slides > .slide.active") } });
})();
