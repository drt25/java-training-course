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

  function startRamWipe(slide) {
    const live = slide.querySelector("[data-ram-live]");
    const gone = slide.querySelector("[data-ram-gone]");
    const chips = slide.querySelector("[data-ram-chips]");
    const status = slide.querySelector("[data-ram-status]");
    const badge = slide.querySelector("[data-ram-badge]");
    if (!live || !gone || !chips || !status) return;

    function play() {
      if (!simActive) return;
      live.classList.add("is-on");
      gone.classList.remove("is-on");
      chips.querySelectorAll(".jdbc-chip").forEach((chip) => {
        chip.classList.remove("fade");
        chip.classList.add("enter");
      });
      if (badge) {
        badge.textContent = "Running";
        badge.classList.remove("warn");
      }
      status.textContent = "Student data is in memory.";
      status.className = "jdbc-status";

      later(() => {
        live.classList.remove("is-on");
        gone.classList.add("is-on");
        if (badge) {
          badge.textContent = "Closed";
          badge.classList.add("warn");
        }
        status.textContent = "Program closed. Memory is being cleared.";
        chips.querySelectorAll(".jdbc-chip").forEach((chip) => chip.classList.add("fade"));
      }, 1800);

      later(() => {
        status.textContent = "Memory cleared. The student data is gone.";
        status.className = "jdbc-status lost";
      }, 2800);

      later(play, 4600);
    }

    play();
  }

  function startTable(slide) {
    const table = slide.querySelector("[data-demo='table']");
    const status = slide.querySelector("[data-table-status]");
    if (!table) return;
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const nameCells = Array.from(table.querySelectorAll("[data-col='name']"));

    function clear() {
      rows.forEach((row) => row.classList.remove("is-on"));
      nameCells.forEach((cell) => cell.classList.remove("col-on"));
    }

    function play() {
      if (!simActive) return;
      clear();
      if (status) status.textContent = "A table holds related student data.";

      later(() => {
        clear();
        if (rows[1]) rows[1].classList.add("is-on");
        if (status) status.textContent = "A row is one student.";
      }, 900);

      later(() => {
        clear();
        nameCells.forEach((cell) => cell.classList.add("col-on"));
        if (status) status.textContent = "A column is one kind of information.";
      }, 2400);

      later(play, 4200);
    }

    play();
  }

  function startIds(slide) {
    const ids = Array.from(slide.querySelectorAll("[data-id]"));
    const status = slide.querySelector("[data-id-status]");
    if (!ids.length) return;

    function play() {
      if (!simActive) return;
      ids.forEach((cell) => {
        cell.classList.add("is-hidden");
        cell.classList.remove("is-shown");
      });
      if (status) status.textContent = "Three students named Ram. Names are not unique.";

      later(() => {
        ids.forEach((cell) => {
          cell.classList.remove("is-hidden");
          cell.classList.add("is-shown");
        });
        if (status) status.textContent = "An identifier distinguishes one row from another.";
      }, 1800);

      later(play, 4000);
    }

    play();
  }

  function startStack(slide) {
    const steps = Array.from(slide.querySelectorAll("[data-stack-step]"));
    if (!steps.length) return;

    function play() {
      if (!simActive) return;
      steps.forEach((step) => step.classList.remove("is-on"));
      steps.forEach((step, i) => {
        later(() => {
          steps.forEach((el) => el.classList.remove("is-on"));
          step.classList.add("is-on");
        }, 400 + i * 750);
      });
      later(play, 400 + steps.length * 750 + 900);
    }

    play();
  }

  function startLib(slide) {
    const jar = slide.querySelector("[data-lib-jar]");
    if (!jar) return;

    function play() {
      if (!simActive) return;
      jar.classList.remove("is-on");
      later(() => jar.classList.add("is-on"), 400);
      later(() => jar.classList.remove("is-on"), 1800);
      later(play, 2800);
    }

    play();
  }

  function startFan(slide) {
    const dbs = Array.from(slide.querySelectorAll("[data-fan]"));
    if (!dbs.length) return;

    function play() {
      if (!simActive) return;
      dbs.forEach((db) => db.classList.remove("is-on"));
      dbs.forEach((db, i) => {
        later(() => {
          dbs.forEach((el) => el.classList.remove("is-on"));
          db.classList.add("is-on");
        }, 350 + i * 900);
      });
      later(play, 350 + dbs.length * 900 + 800);
    }

    play();
  }

  function onShow(slide) {
    if (slide === lastSlide) return;
    lastSlide = slide || null;
    clearTimers();
    if (!slide) return;
    simActive = true;
    if (slide.querySelector('[data-demo="ram-wipe"]')) startRamWipe(slide);
    if (slide.querySelector('[data-demo="table"]')) startTable(slide);
    if (slide.querySelector('[data-demo="ids"]')) startIds(slide);
    if (slide.querySelector('[data-demo="stack"]')) startStack(slide);
    if (slide.querySelector('[data-demo="fan"]')) startFan(slide);
    if (slide.querySelector('[data-demo="lib"]')) startLib(slide);
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
