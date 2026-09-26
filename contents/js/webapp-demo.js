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

  function showAll(nodes) {
    nodes.forEach((node) => node.classList.add("is-on"));
  }

  function pulse(packet) {
    if (!packet) return;
    packet.classList.remove("is-go");
    void packet.offsetWidth;
    packet.classList.add("is-go");
  }

  function startUrl(slide) {
    const el = slide.querySelector("[data-typed]");
    if (!el) return;
    const text = "hatesglobal.com";
    if (reduced()) {
      el.textContent = text;
      return;
    }
    function play() {
      if (!simActive) return;
      let i = 0;
      el.textContent = "";
      function tick() {
        if (!simActive) return;
        el.textContent = text.slice(0, i);
        if (i < text.length) {
          i += 1;
          later(tick, 85);
        } else later(play, 1700);
      }
      tick();
    }
    play();
  }

  function startParts(slide) {
    const parts = Array.from(slide.querySelectorAll("[data-demo='parts'] [data-part]"));
    if (!parts.length) return;
    if (reduced()) return showAll(parts);
    function play() {
      if (!simActive) return;
      parts.forEach((part) => part.classList.remove("is-on"));
      parts.forEach((part, i) => {
        later(() => {
          parts.forEach((el) => el.classList.remove("is-on"));
          part.classList.add("is-on");
        }, 350 + i * 750);
      });
      later(play, 350 + parts.length * 750 + 700);
    }
    play();
  }

  const PREVIEW = [
    "The user wants the jobs page.",
    "The browser opens hatesglobal.com.",
    "The frontend is what they will see.",
    "The backend will do the work.",
    "The database stores the jobs.",
  ];

  function startPreview(slide) {
    const root = slide.querySelector("[data-demo='preview']");
    if (!root) return;
    const hops = Array.from(root.querySelectorAll("[data-hop]"));
    const caption = slide.querySelector("[data-caption]");
    if (reduced()) return showAll(hops);
    function play() {
      if (!simActive) return;
      hops.forEach((hop) => hop.classList.remove("is-on"));
      hops.forEach((hop, i) => {
        later(() => {
          hops.forEach((el) => el.classList.remove("is-on"));
          hop.classList.add("is-on");
          if (caption) caption.textContent = PREVIEW[i];
        }, i * 900);
      });
      later(play, hops.length * 900 + 800);
    }
    play();
  }

  function startDns(slide) {
    const root = slide.querySelector("[data-demo='dns']");
    if (!root) return;
    const phone = root.querySelector("[data-phone]");
    const web = root.querySelector("[data-web]");
    const num = root.querySelector("[data-phone-num]");
    const steps = Array.from(root.querySelectorAll("[data-dns-step]"));
    if (reduced()) {
      phone.classList.add("is-on");
      web.classList.add("is-on");
      num.classList.add("is-on");
      showAll(steps);
      return;
    }
    root.classList.add("is-playing");
    function play() {
      if (!simActive) return;
      phone.classList.remove("is-on");
      web.classList.remove("is-on");
      num.classList.remove("is-on");
      steps.forEach((step) => step.classList.remove("is-on"));
      later(() => phone.classList.add("is-on"), 250);
      later(() => num.classList.add("is-on"), 1100);
      later(() => {
        phone.classList.remove("is-on");
        web.classList.add("is-on");
      }, 2500);
      steps.forEach((step, i) => later(() => step.classList.add("is-on"), 2900 + i * 700));
      later(play, 2900 + steps.length * 700 + 1200);
    }
    play();
  }

  function startSend(slide) {
    const root = slide.querySelector("[data-demo='send']");
    if (!root) return;
    const packet = root.querySelector("[data-packet]");
    const from = root.querySelector("[data-from]");
    const to = root.querySelector("[data-to]");
    if (reduced()) {
      from.classList.add("is-on");
      to.classList.add("is-on");
      return;
    }
    function play() {
      if (!simActive) return;
      from.classList.add("is-on");
      to.classList.remove("is-on");
      packet.classList.remove("is-go");
      later(() => pulse(packet), 200);
      later(() => to.classList.add("is-on"), 1400);
      later(() => from.classList.remove("is-on"), 2600);
      later(play, 3100);
    }
    play();
  }

  function startChain(selector, slide) {
    const hops = Array.from(slide.querySelectorAll(selector));
    if (!hops.length) return;
    if (reduced()) return showAll(hops);
    function play() {
      if (!simActive) return;
      hops.forEach((hop) => hop.classList.remove("is-on"));
      hops.forEach((hop, i) => later(() => hop.classList.add("is-on"), 300 + i * 700));
      later(play, 300 + hops.length * 700 + 900);
    }
    play();
  }

  function startJobs(slide) {
    const root = slide.querySelector("[data-demo='jobs']");
    if (!root) return;
    const be = root.querySelector("[data-be]");
    const db = root.querySelector("[data-db]");
    const line = root.querySelector("[data-be-line]");
    const ask = root.querySelector("[data-ask]");
    const reply = root.querySelector("[data-reply]");
    const rows = Array.from(root.querySelectorAll("[data-row]"));
    if (reduced()) {
      root.classList.remove("is-playing");
      be.classList.add("is-on");
      db.classList.add("is-on");
      showAll(rows);
      if (line) line.textContent = "Jobs received.";
      return;
    }
    root.classList.add("is-playing");
    function play() {
      if (!simActive) return;
      be.classList.remove("is-on");
      db.classList.remove("is-on");
      rows.forEach((row) => row.classList.remove("is-on"));
      ask.classList.remove("is-go");
      reply.classList.remove("is-go");
      if (line) line.textContent = "Show me available jobs.";
      later(() => {
        be.classList.add("is-on");
        pulse(ask);
      }, 300);
      later(() => db.classList.add("is-on"), 1100);
      rows.forEach((row, i) => later(() => row.classList.add("is-on"), 1450 + i * 420));
      const after = 1450 + rows.length * 420;
      later(() => {
        ask.classList.remove("is-go");
        pulse(reply);
      }, after + 250);
      later(() => {
        if (line) line.textContent = "Jobs received.";
      }, after + 900);
      later(play, after + 3400);
    }
    play();
  }

  function startPage(slide) {
    const root = slide.querySelector("[data-demo='page']");
    if (!root) return;
    const bits = Array.from(root.querySelectorAll("[data-page-bit]"));
    if (reduced()) {
      root.classList.remove("is-playing");
      showAll(bits);
      return;
    }
    root.classList.add("is-playing");
    function play() {
      if (!simActive) return;
      bits.forEach((bit) => bit.classList.remove("is-on"));
      bits.forEach((bit, i) => later(() => bit.classList.add("is-on"), 280 + i * 520));
      later(play, 280 + bits.length * 520 + 1700);
    }
    play();
  }

  const LOOP = [
    { text: "The user opens the website.", back: false },
    { text: "Browser asks the server.", back: false },
    { text: "The request arrives at the server.", back: false },
    { text: "Backend processes the request.", back: false },
    { text: "Backend asks for jobs.", back: false },
    { text: "Database sends the jobs back.", back: true },
    { text: "Backend responds. Browser displays it.", back: true },
    { text: "The user sees the jobs.", back: true },
  ];

  function placeDot(root, hop, dot) {
    const box = root.getBoundingClientRect();
    const row = hop.getBoundingClientRect();
    dot.style.top = row.top - box.top + row.height / 2 - 6 + "px";
  }

  function startLoop(slide) {
    const root = slide.querySelector("[data-demo='loop']");
    if (!root) return;
    const hops = Array.from(root.querySelectorAll("[data-hop]"));
    const dot = root.querySelector("[data-dot]");
    const caption = slide.querySelector("[data-caption]");
    const direction = slide.querySelector("[data-direction]");
    if (reduced()) {
      hops.forEach((hop, i) => {
        hop.classList.add("is-on");
        if (LOOP[i].back) hop.classList.add("is-back");
      });
      if (caption) caption.textContent = LOOP[LOOP.length - 1].text;
      if (direction) direction.textContent = "Response";
      return;
    }
    function play() {
      if (!simActive) return;
      hops.forEach((hop) => hop.classList.remove("is-on", "is-back"));
      hops.forEach((hop, i) => {
        later(() => {
          hops.forEach((el) => el.classList.remove("is-on"));
          hop.classList.add("is-on");
          if (LOOP[i].back) hop.classList.add("is-back");
          if (dot) {
            dot.classList.toggle("is-back", LOOP[i].back);
            placeDot(root, hop, dot);
          }
          if (caption) caption.textContent = LOOP[i].text;
          if (direction) direction.textContent = LOOP[i].back ? "Response" : "Request";
        }, i * 900);
      });
      later(play, hops.length * 900 + 1000);
    }
    play();
  }

  function startLogin(slide) {
    const root = slide.querySelector("[data-demo='login']");
    if (!root) return;
    const email = root.querySelector("[data-email]");
    const pass = root.querySelector("[data-pass]");
    const btn = root.querySelector("[data-login-btn]");
    const dash = root.querySelector("[data-dash]");
    const hops = Array.from(root.querySelectorAll("[data-hop]"));
    const emailText = "dharma@example.com";
    const passText = "******";

    if (reduced()) {
      email.value = emailText;
      pass.value = passText;
      dash.classList.add("is-on");
      showAll(hops);
      return;
    }

    root.classList.add("is-playing");
    function play() {
      if (!simActive) return;
      root.classList.remove("is-done");
      email.value = "";
      pass.value = "";
      btn.classList.remove("is-on");
      dash.classList.remove("is-on");
      hops.forEach((hop) => hop.classList.remove("is-on"));
      later(() => hops[0].classList.add("is-on"), 200);
      later(() => hops[1].classList.add("is-on"), 650);
      emailText.split("").forEach((_, i) => {
        later(() => {
          email.value = emailText.slice(0, i + 1);
        }, 850 + i * 40);
      });
      const afterEmail = 850 + emailText.length * 40;
      passText.split("").forEach((_, i) => {
        later(() => {
          pass.value = passText.slice(0, i + 1);
        }, afterEmail + 180 + i * 60);
      });
      const afterPass = afterEmail + 180 + passText.length * 60;
      later(() => btn.classList.add("is-on"), afterPass + 180);
      [2, 3, 4, 5, 6, 7, 8, 9].forEach((index, i) => {
        later(() => hops[index].classList.add("is-on"), afterPass + 450 + i * 380);
      });
      const doneAt = afterPass + 450 + 8 * 380;
      later(() => {
        root.classList.add("is-done");
        dash.classList.add("is-on");
      }, doneAt);
      later(play, doneAt + 1900);
    }
    play();
  }

  function startRule(slide) {
    const root = slide.querySelector("[data-demo='rule']");
    if (!root) return;
    const bad = root.querySelector("[data-bad]");
    const good = root.querySelector("[data-good]");
    if (reduced()) {
      bad.classList.add("is-on");
      good.classList.add("is-on");
      return;
    }
    root.classList.add("is-playing");
    function play() {
      if (!simActive) return;
      bad.classList.remove("is-on");
      good.classList.remove("is-on");
      later(() => bad.classList.add("is-on"), 350);
      later(() => good.classList.add("is-on"), 1700);
      later(play, 3900);
    }
    play();
  }

  function onShow(slide) {
    if (!slide || slide === lastSlide) return;
    lastSlide = slide;
    clearTimers();
    simActive = true;
    if (slide.querySelector("[data-demo='url']")) startUrl(slide);
    if (slide.querySelector("[data-demo='parts']")) startParts(slide);
    if (slide.querySelector("[data-demo='preview']")) startPreview(slide);
    if (slide.querySelector("[data-demo='dns']")) startDns(slide);
    if (slide.querySelector("[data-demo='send']")) startSend(slide);
    if (slide.querySelector("[data-demo='receive']")) startChain("[data-demo='receive'] [data-hop]", slide);
    if (slide.querySelector("[data-demo='jobs']")) startJobs(slide);
    if (slide.querySelector("[data-demo='page']")) startPage(slide);
    if (slide.querySelector("[data-demo='loop']")) startLoop(slide);
    if (slide.querySelector("[data-demo='login']")) startLogin(slide);
    if (slide.querySelector("[data-demo='rule']")) startRule(slide);
    if (slide.querySelector("[data-demo='java']")) startChain("[data-demo='java'] [data-hop]", slide);
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

  onShow(document.querySelector("#lesson-slides > .slide.active"));
})();
