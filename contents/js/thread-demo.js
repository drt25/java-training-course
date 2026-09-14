(function () {
  let timers = [];
  let intervals = [];
  let simActive = false;

  const PLACES = ["Baneshwor", "Thamel", "Patan", "Lazimpat", "Pulchowk", "Koteshwor", "New Road", "Bhaktapur"];
  const AMOUNTS = [80, 150, 250, 450, 590, 990, 1200, 2500, 3500];

  function clearTimers() {
    simActive = false;
    timers.forEach(clearTimeout);
    intervals.forEach(clearInterval);
    timers = [];
    intervals = [];
  }

  function later(fn, ms) {
    const id = setTimeout(() => {
      if (!simActive) return;
      fn();
    }, ms);
    timers.push(id);
    return id;
  }

  function every(fn, ms) {
    const id = setInterval(() => {
      if (!simActive) return;
      fn();
    }, ms);
    intervals.push(id);
    return id;
  }

  function makeTxn(id) {
    return {
      id: "TXN-" + id,
      amount: AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)],
      place: PLACES[Math.floor(Math.random() * PLACES.length)],
      createdAt: Date.now(),
      status: "waiting",
      el: null,
    };
  }

  function renderCard(txn) {
    const card = document.createElement("div");
    card.className = "mt-card";
    card.innerHTML =
      "<span><span class=\"oid\">" + txn.id + "</span><br />" +
      "<span class=\"meta\">QR · Rs. " + txn.amount.toLocaleString() + " · " + txn.place + "</span></span>" +
      "<span class=\"mt-wait\">waiting</span>";
    txn.el = card;
    return card;
  }

  function setBadge(txn, text, cls) {
    if (!txn.el) return;
    const badge = txn.el.querySelector(".mt-wait");
    if (!badge) return;
    badge.textContent = text;
    badge.className = "mt-wait" + (cls ? " " + cls : "");
  }

  function removeCard(txn, delay) {
    later(() => {
      if (!txn.el) return;
      txn.el.classList.add("leaving");
      later(() => {
        if (txn.el && txn.el.parentNode) txn.el.parentNode.removeChild(txn.el);
        txn.el = null;
      }, 400);
    }, delay || 0);
  }

  function trimQueueDom(container, max, queue, onDrop) {
    while (container.children.length > max) {
      let target = null;
      for (let i = container.children.length - 1; i >= 0; i--) {
        const el = container.children[i];
        const txn = queue.find((item) => item.el === el);
        if (txn && txn.status === "waiting") {
          target = txn;
          break;
        }
      }
      if (!target) break;
      if (onDrop) onDrop(target);
      else {
        if (target.el && target.el.parentNode) target.el.parentNode.removeChild(target.el);
        target.el = null;
      }
    }
  }

  function resetBoards() {
    const consoleBody = document.getElementById("mt-console-body");
    const singleQueue = document.getElementById("queue-single");
    const multiQueue = document.getElementById("queue-multi");
    if (consoleBody) consoleBody.innerHTML = "";
    if (singleQueue) singleQueue.innerHTML = "";
    if (multiQueue) multiQueue.innerHTML = "";
    document.querySelectorAll(".mt-fill").forEach((el) => {
      el.style.width = "0%";
    });
  }

  function startConsoleDemo() {
    const body = document.getElementById("mt-console-body");
    if (!body) return;

    function addLine(html) {
      const line = document.createElement("div");
      line.className = "mt-console-line";
      line.innerHTML = html;
      body.appendChild(line);
      requestAnimationFrame(() => line.classList.add("show"));
      return line;
    }

    function addBusyBar() {
      const bar = document.createElement("div");
      bar.className = "mt-busy-bar on";
      body.appendChild(bar);
      return bar;
    }

    function runCycle() {
      if (!simActive) return;
      body.innerHTML = "";
      addLine('<span class="dim">// only one worker available</span>');

      later(() => {
        if (!simActive) return;
        addLine('<span class="prompt">main&gt;</span> Step 1: Load data… <span class="mt-cursor"></span>');
        const bar1 = addBusyBar();
        later(() => {
          if (!simActive) return;
          if (bar1.parentNode) bar1.parentNode.removeChild(bar1);
          const lines = body.querySelectorAll(".mt-console-line");
          if (lines[1]) lines[1].innerHTML = '<span class="prompt">main&gt;</span> Step 1: Load data…';
          addLine('<span class="ok">✓</span> Data loaded');
        }, 1400);
      }, 400);

      later(() => {
        if (!simActive) return;
        addLine('<span class="prompt">main&gt;</span> Step 2: Process… <span class="busy">busy…</span> <span class="mt-cursor"></span>');
        const bar2 = addBusyBar();
        later(() => {
          if (!simActive) return;
          if (bar2.parentNode) bar2.parentNode.removeChild(bar2);
          const lines = body.querySelectorAll(".mt-console-line");
          const lastPrompt = Array.from(lines).reverse().find((line) => line.textContent.includes("Step 2"));
          if (lastPrompt) lastPrompt.innerHTML = '<span class="prompt">main&gt;</span> Step 2: Process…';
          addLine('<span class="ok">✓</span> Process done');
        }, 1600);
      }, 2200);

      later(() => {
        if (!simActive) return;
        addLine('<span class="prompt">main&gt;</span> Step 3: Print result');
        addLine('<span class="ok">✓</span> Hello, student! <span class="dim">(next job must wait)</span>');
      }, 4200);

      later(() => {
        if (!simActive) return;
        runCycle();
      }, 8500);
    }

    runCycle();
  }

  function startSingleSim() {
    const container = document.getElementById("queue-single");
    const qEl = document.getElementById("s-queue");
    const sEl = document.getElementById("s-success");
    const fEl = document.getElementById("s-failed");
    const statusEl = document.getElementById("s-w1-status");
    const barEl = document.getElementById("s-w1-bar");
    const workerEl = document.getElementById("s-w1");
    if (!container || !workerEl) return;

    container.innerHTML = "";
    let nextId = 2040;
    let success = 0;
    let failed = 0;
    let busy = false;
    const queue = [];
    const TIMEOUT_MS = 3500;
    const PROCESS_MS = 3200;
    const MAX_VISIBLE = 5;

    function updateStats() {
      if (qEl) qEl.textContent = String(queue.filter((t) => t.status === "waiting" || t.status === "processing").length);
      if (sEl) sEl.textContent = String(success);
      if (fEl) fEl.textContent = String(failed);
    }

    function markTimeout(txn) {
      if (!txn || txn.status === "failed" || txn.status === "done" || txn.status === "processing") return;
      txn.status = "failed";
      failed++;
      setBadge(txn, "timeout", "fail");
      if (txn.el) txn.el.classList.add("timed-out");
      updateStats();
      removeCard(txn, 1800);
      later(() => {
        const idx = queue.indexOf(txn);
        if (idx >= 0) queue.splice(idx, 1);
        updateStats();
      }, 2300);
    }

    function spawn() {
      if (!simActive) return;
      const txn = makeTxn(nextId++);
      queue.push(txn);
      container.insertBefore(renderCard(txn), container.firstChild);
      trimQueueDom(container, MAX_VISIBLE, queue, markTimeout);
      updateStats();
      tryAssign();
    }

    function failTimedOut() {
      if (!simActive) return;
      const now = Date.now();
      queue.filter((t) => t.status === "waiting" && t.el).forEach((t) => {
        if (now - t.createdAt >= TIMEOUT_MS) markTimeout(t);
      });
    }

    function tryAssign() {
      if (!simActive || busy) return;
      const next = queue.find((t) => t.status === "waiting" && t.el);
      if (!next) {
        statusEl.textContent = "Idle…";
        barEl.style.width = "0%";
        workerEl.classList.remove("busy");
        workerEl.classList.add("idle");
        return;
      }

      busy = true;
      next.status = "processing";
      workerEl.classList.add("busy");
      workerEl.classList.remove("idle");
      statusEl.textContent = "Processing " + next.id + "…";
      setBadge(next, "processing", "processing");
      barEl.style.width = "0%";
      updateStats();

      const start = Date.now();
      const tick = () => {
        if (!simActive || next.status !== "processing") return;
        const p = Math.min(100, ((Date.now() - start) / PROCESS_MS) * 100);
        barEl.style.width = p + "%";
        if (p < 100) {
          later(tick, 80);
        } else {
          next.status = "done";
          success++;
          setBadge(next, "done", "done");
          statusEl.textContent = "Completed " + next.id;
          updateStats();
          removeCard(next, 500);
          later(() => {
            const idx = queue.indexOf(next);
            if (idx >= 0) queue.splice(idx, 1);
            busy = false;
            barEl.style.width = "0%";
            updateStats();
            tryAssign();
          }, 700);
        }
      };
      later(tick, 50);
    }

    if (qEl) qEl.textContent = "0";
    if (sEl) sEl.textContent = "0";
    if (fEl) fEl.textContent = "0";
    statusEl.textContent = "Idle…";
    barEl.style.width = "0%";

    for (let i = 0; i < 3; i++) later(spawn, 150 + i * 280);
    every(spawn, 700);
    every(failTimedOut, 400);
    later(tryAssign, 350);
  }

  function startMultiSim() {
    const container = document.getElementById("queue-multi");
    const qEl = document.getElementById("m-queue");
    const wEl = document.getElementById("m-wait");
    if (!container) return;

    container.innerHTML = "";
    let nextId = 3100;
    const queue = [];
    const MAX_VISIBLE = 5;
    const PROCESS_MS = 1000;
    const workers = [
      { busy: false, statusEl: document.getElementById("m-w1-status"), barEl: document.getElementById("m-w1-bar"), el: document.getElementById("m-w1") },
      { busy: false, statusEl: document.getElementById("m-w2-status"), barEl: document.getElementById("m-w2-bar"), el: document.getElementById("m-w2") },
      { busy: false, statusEl: document.getElementById("m-w3-status"), barEl: document.getElementById("m-w3-bar"), el: document.getElementById("m-w3") },
    ];

    if (qEl) qEl.textContent = "0";
    if (wEl) wEl.textContent = "~1s";
    workers.forEach((w) => {
      if (!w.el) return;
      w.statusEl.textContent = "Ready";
      w.barEl.style.width = "0%";
      w.el.classList.remove("busy");
      w.el.classList.add("idle");
    });

    function updateStats() {
      const waiting = queue.filter((t) => t.status === "waiting" || t.status === "processing").length;
      if (qEl) qEl.textContent = String(waiting);
      if (wEl) wEl.textContent = waiting <= 2 ? "~1s" : waiting <= 4 ? "~2s" : "~3s";
    }

    function spawn() {
      if (!simActive) return;
      const waiting = queue.filter((t) => t.status === "waiting").length;
      if (waiting >= 5) return;
      const txn = makeTxn(nextId++);
      queue.push(txn);
      container.insertBefore(renderCard(txn), container.firstChild);
      trimQueueDom(container, MAX_VISIBLE, queue, null);
      updateStats();
      assignAll();
    }

    function assignAll() {
      workers.forEach((w) => {
        if (!w.el || w.busy) return;
        const next = queue.find((t) => t.status === "waiting" && t.el);
        if (!next) {
          w.statusEl.textContent = "Ready";
          w.barEl.style.width = "0%";
          w.el.classList.remove("busy");
          w.el.classList.add("idle");
          return;
        }
        w.busy = true;
        next.status = "processing";
        w.el.classList.add("busy");
        w.el.classList.remove("idle");
        w.statusEl.textContent = "Processing " + next.id;
        setBadge(next, "processing", "processing");
        w.barEl.style.width = "0%";
        updateStats();

        const start = Date.now();
        const tick = () => {
          if (!simActive || next.status !== "processing") return;
          const p = Math.min(100, ((Date.now() - start) / PROCESS_MS) * 100);
          w.barEl.style.width = p + "%";
          if (p < 100) {
            later(tick, 60);
          } else {
            next.status = "done";
            setBadge(next, "done", "done");
            w.statusEl.textContent = "Done " + next.id;
            removeCard(next, 350);
            later(() => {
              const idx = queue.indexOf(next);
              if (idx >= 0) queue.splice(idx, 1);
              w.busy = false;
              w.barEl.style.width = "0%";
              updateStats();
              assignAll();
            }, 450);
          }
        };
        later(tick, 40);
      });
    }

    for (let i = 0; i < 3; i++) later(spawn, 150 + i * 200);
    every(spawn, 700);
    every(assignAll, 300);
  }

  let lastSlide = null;

  function onShow(slide) {
    if (slide === lastSlide) return;
    lastSlide = slide || null;
    clearTimers();
    resetBoards();
    if (!slide) return;
    simActive = true;
    if (slide.querySelector('[data-demo="console"]')) startConsoleDemo();
    if (slide.querySelector('[data-demo="single"]')) startSingleSim();
    if (slide.querySelector('[data-demo="multi"]')) startMultiSim();
  }

  function watchSlides() {
    document.querySelectorAll("#lesson-slides > .slide").forEach((slide) => {
      const observer = new MutationObserver(() => {
        if (slide.classList.contains("active")) onShow(slide);
      });
      observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
    });
  }

  window.addEventListener("lesson-slide-show", (event) => {
    onShow(event.detail && event.detail.slide);
  });

  watchSlides();
  onShow(document.querySelector(".slide.active"));
})();
