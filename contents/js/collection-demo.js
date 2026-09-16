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

  function chip(name, extra) {
    const el = document.createElement("span");
    el.className = "col-chip" + (extra ? " " + extra : "");
    el.textContent = name;
    return el;
  }

  function startGrow(slide) {
    const list = slide.querySelector("[data-grow-list]");
    const listStatus = slide.querySelector("[data-grow-list-status]");
    const arrayStatus = slide.querySelector("[data-grow-array-status]");
    const ghost = slide.querySelector("[data-grow-ghost]");
    if (!list || !listStatus || !arrayStatus) return;

    function resetList(names) {
      list.innerHTML = "";
      names.forEach((name) => list.appendChild(chip(name)));
    }

    function play() {
      if (!simActive) return;
      resetList(["John", "Sarah", "David"]);
      listStatus.textContent = "Three students today.";
      listStatus.className = "col-status ok";
      arrayStatus.textContent = "Size is 3. It stays 3.";
      arrayStatus.className = "col-status";
      if (ghost) ghost.classList.remove("show", "blocked");

      later(() => {
        arrayStatus.textContent = 'Need Emma. Array is already full.';
        arrayStatus.className = "col-status bad";
        if (ghost) ghost.classList.add("show");
      }, 1100);

      later(() => {
        if (ghost) ghost.classList.add("blocked");
        arrayStatus.textContent = "Cannot add. The size is fixed.";
      }, 1900);

      later(() => {
        list.appendChild(chip("Emma", "entering"));
        listStatus.textContent = 'students.add("Emma")  ·  size is now 4';
      }, 2700);

      later(() => {
        const first = list.querySelector(".col-chip");
        if (!first) return;
        first.classList.add("leaving");
        later(() => {
          if (first.parentNode) first.parentNode.removeChild(first);
        }, 300);
        listStatus.textContent = 'students.remove("John")  ·  size is now 3';
      }, 4100);

      later(play, 5800);
    }

    play();
  }

  function startSet(slide) {
    const box = slide.querySelector("[data-set-box]");
    const log = slide.querySelector("[data-set-log]");
    if (!box || !log) return;

    function addLog(text, ok) {
      const line = document.createElement("div");
      line.className = "col-log-line " + (ok ? "ok" : "bad");
      line.textContent = text;
      log.appendChild(line);
    }

    function play() {
      if (!simActive) return;
      box.innerHTML = "";
      log.innerHTML = "";

      later(() => {
        box.appendChild(chip("john@gmail.com", "entering"));
        addLog('add("john@gmail.com")  →  true', true);
      }, 350);

      later(() => {
        box.appendChild(chip("sarah@gmail.com", "entering"));
        addLog('add("sarah@gmail.com")  →  true', true);
      }, 1500);

      later(() => {
        const extra = chip("john@gmail.com", "ghost");
        box.appendChild(extra);
        later(() => extra.classList.add("ignored"), 80);
        addLog('add("john@gmail.com")  →  false   already there', false);
        later(() => {
          extra.classList.add("leaving");
          later(() => {
            if (extra.parentNode) extra.parentNode.removeChild(extra);
          }, 280);
        }, 1100);
      }, 2700);

      later(play, 5000);
    }

    play();
  }

  function startMap(slide) {
    const listCells = slide.querySelectorAll("[data-map-list] .col-idx-cell");
    const mapRows = slide.querySelectorAll("[data-map-dict] .col-pair");
    const listStatus = slide.querySelector("[data-map-list-status]");
    const mapStatus = slide.querySelector("[data-map-dict-status]");
    if (!listCells.length || !mapRows.length) return;

    function clearMarks(nodes) {
      nodes.forEach((node) => node.classList.remove("is-on", "miss", "hit"));
    }

    function play() {
      if (!simActive) return;
      clearMarks(listCells);
      clearMarks(mapRows);
      if (listStatus) {
        listStatus.textContent = 'Find "Sarah". Walk index 0, then 1, then 2.';
        listStatus.className = "col-status";
      }
      if (mapStatus) {
        mapStatus.textContent = "students.get(102)";
        mapStatus.className = "col-status";
      }

      later(() => {
        if (listCells[0]) listCells[0].classList.add("is-on", "miss");
        if (listStatus) listStatus.textContent = "0 → John. Keep looking.";
      }, 450);

      later(() => {
        if (mapRows[1]) mapRows[1].classList.add("is-on");
        if (mapStatus) {
          mapStatus.textContent = "102 → Sarah. Direct lookup.";
          mapStatus.className = "col-status ok";
        }
      }, 700);

      later(() => {
        if (listCells[0]) listCells[0].classList.remove("is-on");
        if (listCells[1]) listCells[1].classList.add("is-on", "hit");
        if (listStatus) {
          listStatus.textContent = "1 → Sarah. Found after walking.";
          listStatus.className = "col-status ok";
        }
      }, 1500);

      later(play, 4200);
    }

    play();
  }

  function onShow(slide) {
    if (slide === lastSlide) return;
    lastSlide = slide || null;
    clearTimers();
    if (!slide) return;
    simActive = true;
    if (slide.querySelector('[data-demo="grow"]')) startGrow(slide);
    if (slide.querySelector('[data-demo="set"]')) startSet(slide);
    if (slide.querySelector('[data-demo="map"]')) startMap(slide);
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
