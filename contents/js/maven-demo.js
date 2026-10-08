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
        later(() => node.classList.add("is-on"), 280 + index * 420);
      });
      later(play, 900 + nodes.length * 420);
    }

    play();
  }

  function showTarget(dir, classes, jar, on) {
    dir.classList.toggle("is-on", on.dir);
    dir.classList.toggle("mvn-ghost", !on.dir);
    classes.classList.toggle("is-on", on.classes);
    classes.classList.toggle("mvn-ghost", !on.classes);
    jar.classList.toggle("is-on", on.jar);
    jar.classList.toggle("mvn-ghost", !on.jar);
  }

  function startTarget(slide) {
    const root = slide.querySelector("[data-demo='target']");
    if (!root) return;
    const cmd = root.querySelector("[data-target-cmd]");
    const status = root.querySelector("[data-target-status]");
    const dir = root.querySelector("[data-target-dir]");
    const classes = root.querySelector("[data-target-classes]");
    const jar = root.querySelector("[data-target-jar]");
    if (!cmd || !status || !dir || !classes || !jar) return;

    const frames = [
      {
        cmd: "mvn compile",
        status: "Compile writes class files into target/classes.",
        dir: true,
        classes: true,
        jar: false,
      },
      {
        cmd: "mvn clean",
        status: "clean removes target.",
        dir: false,
        classes: false,
        jar: false,
      },
      {
        cmd: "mvn compile",
        status: "Compile again. target comes back.",
        dir: true,
        classes: true,
        jar: false,
      },
      {
        cmd: "mvn package",
        status: "package adds mysql-maven-demo-1.0.jar.",
        dir: true,
        classes: true,
        jar: true,
      },
    ];

    if (reduced()) {
      const last = frames[frames.length - 1];
      cmd.textContent = last.cmd;
      status.textContent = last.status;
      showTarget(dir, classes, jar, last);
      return;
    }

    let index = 0;
    function play() {
      if (!simActive) return;
      const frame = frames[index];
      cmd.textContent = frame.cmd;
      status.textContent = frame.status;
      showTarget(dir, classes, jar, frame);
      index = (index + 1) % frames.length;
      later(play, 1700);
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
    startTarget(slide);
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
