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
    return id;
  }

  function chip(value, extra) {
    const el = document.createElement("span");
    el.className = "j8-chip" + (extra ? " " + extra : "");
    el.textContent = value;
    return el;
  }

  function fill(box, values, extra) {
    if (!box) return;
    box.innerHTML = "";
    values.forEach((value) => box.appendChild(chip(value, extra)));
  }

  function startPipeline(slide) {
    const source = slide.querySelector("[data-pipe-source]");
    const filtered = slide.querySelector("[data-pipe-filter]");
    const mapped = slide.querySelector("[data-pipe-map]");
    const collected = slide.querySelector("[data-pipe-collect]");
    const status = slide.querySelector("[data-pipe-status]");
    if (!source || !filtered || !mapped || !collected || !status) return;

    function play() {
      if (!simActive) return;
      fill(source, [10, 20, 30, 40, 50]);
      fill(filtered, []);
      fill(mapped, []);
      fill(collected, []);
      status.textContent = "List holds the data. stream() starts processing.";
      status.className = "j8-status";

      later(() => {
        fill(source, [10, 20, 30, 40, 50], "enter");
        status.textContent = "filter(n -> n > 20)";
        status.className = "j8-status mid";
      }, 700);

      later(() => {
        source.innerHTML = "";
        source.appendChild(chip(10, "drop"));
        source.appendChild(chip(20, "drop"));
        source.appendChild(chip(30, "keep"));
        source.appendChild(chip(40, "keep"));
        source.appendChild(chip(50, "keep"));
        fill(filtered, [30, 40, 50], "keep enter");
        status.textContent = "10 and 20 drop. 30, 40, 50 stay.";
      }, 1600);

      later(() => {
        fill(mapped, [60, 80, 100], "mapped enter");
        status.textContent = "map(n -> n * 2)  ·  30→60  40→80  50→100";
        status.className = "j8-status mid";
      }, 2800);

      later(() => {
        fill(collected, [60, 80, 100], "keep enter");
        status.textContent = "collect() stores a new list: [60, 80, 100]";
        status.className = "j8-status ok";
      }, 3900);

      later(play, 5600);
    }

    play();
  }

  function startPlus(slide) {
    const from = slide.querySelector("[data-plus-from]");
    const to = slide.querySelector("[data-plus-to]");
    const op = slide.querySelector("[data-plus-op]");
    if (!from || !to) return;

    function play() {
      if (!simActive) return;
      from.classList.remove("is-on");
      to.classList.remove("is-on");
      if (op) {
        op.classList.remove("pulse");
        op.textContent = "today";
      }

      later(() => {
        from.classList.add("is-on");
        if (op) op.textContent = "plusDays(1)";
      }, 400);

      later(() => {
        if (op) op.classList.add("pulse");
      }, 1100);

      later(() => {
        from.classList.remove("is-on");
        to.classList.add("is-on");
        if (op) op.textContent = "tomorrow";
      }, 1700);

      later(play, 3600);
    }

    play();
  }

  function onShow(slide) {
    if (slide === lastSlide) return;
    lastSlide = slide || null;
    clearTimers();
    if (!slide) return;
    simActive = true;
    if (slide.querySelector('[data-demo="pipeline"]')) startPipeline(slide);
    if (slide.querySelector('[data-demo="plus"]')) startPlus(slide);
  }

  document.querySelectorAll("#lesson-slides > .slide").forEach((slide) => {
    const observer = new MutationObserver(() => {
      if (slide.classList.contains("active")) onShow(slide);
    });
    observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
  });

  window.addEventListener("lesson-slide-show", (event) => {
    onShow(event.detail && event.detail.slide);
  });

  onShow(document.querySelector(".slide.active"));
})();
