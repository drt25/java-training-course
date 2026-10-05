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

  function light(nodes, focusCount) {
    nodes.forEach((node, index) => {
      later(() => {
        node.classList.add("is-on");
        if (focusCount && index < focusCount) node.classList.add("is-focus");
      }, 280 + index * 420);
    });
  }

  function startLane(slide) {
    const root = slide.querySelector("[data-demo='lane']");
    if (!root) return;
    const ends = root.querySelectorAll("[data-end]");
    const packet = root.querySelector("[data-packet]");
    if (reduced()) {
      ends.forEach((node) => node.classList.add("is-on"));
      if (packet) packet.classList.add("is-go");
      return;
    }
    function play() {
      if (!simActive) return;
      ends.forEach((node) => node.classList.remove("is-on"));
      if (packet) packet.classList.remove("is-go");
      later(() => ends[0] && ends[0].classList.add("is-on"), 200);
      later(() => packet && packet.classList.add("is-go"), 700);
      later(() => ends[1] && ends[1].classList.add("is-on"), 2000);
      later(play, 4200);
    }
    play();
  }

  function startHttp(slide) {
    const root = slide.querySelector("[data-demo='http']");
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll("[data-method]"));
    if (reduced()) {
      nodes.forEach((node, index) => {
        node.classList.add("is-on");
        if (index < 2) node.classList.add("is-focus");
      });
      return;
    }
    light(nodes, 2);
  }

  function startLife(slide) {
    const root = slide.querySelector("[data-demo='life']");
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll("[data-step]"));
    if (reduced()) {
      nodes.forEach((node) => node.classList.add("is-on"));
      return;
    }
    light(nodes);
  }

  function startPath(slide) {
    const root = slide.querySelector("[data-demo='path']");
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll("[data-hop]"));
    if (reduced()) {
      nodes.forEach((node) => node.classList.add("is-on"));
      return;
    }
    light(nodes);
  }

  function onShow(event) {
    const slide = event.detail && event.detail.slide;
    if (!slide || slide === lastSlide) return;
    lastSlide = slide;
    clearTimers();
    simActive = true;
    startLane(slide);
    startHttp(slide);
    startLife(slide);
    startPath(slide);
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
