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

  function startPath(slide) {
    const root = slide.querySelector("[data-demo='path']");
    if (!root) return;
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

  function onShow(event) {
    const slide = event.detail && event.detail.slide;
    if (!slide || slide === lastSlide) return;
    lastSlide = slide;
    clearTimers();
    simActive = true;
    startPath(slide);
  }

  window.addEventListener("lesson-slide-show", onShow);
  onShow({ detail: { slide: document.querySelector("#lesson-slides > .slide.active") } });
})();
