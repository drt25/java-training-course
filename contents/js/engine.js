(function () {
  const root = document.getElementById("lesson-slides");
  if (!root || !window.Brand) return;

  const meta = {
    lesson: document.body.dataset.lesson || "",
    title: document.body.dataset.title || "",
    module: document.body.dataset.module || "Professional Java Programming",
    topics: (document.body.dataset.topics || "")
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  root.insertAdjacentHTML("afterbegin", Brand.titleSlide(meta));
  root.insertAdjacentHTML("afterbegin", Brand.startSlide(meta));
  root.insertAdjacentHTML("beforeend", Brand.thankYouSlide());

  const deck = document.createElement("div");
  deck.className = "deck";
  root.parentNode.insertBefore(deck, root);
  deck.appendChild(root);

  const slides = Array.from(root.querySelectorAll(":scope > .slide"));
  slides.forEach((slide, index) => {
    if (!slide.dataset.brand || slide.dataset.brand === "title") {
      slide.insertAdjacentHTML("beforeend", Brand.footer(meta, index + 1, slides.length));
    }
  });

  deck.insertAdjacentHTML(
    "beforeend",
    `
    <div class="ui-bar">
      <button class="ui-btn" id="btn-fs" type="button">Fullscreen</button>
      <button class="ui-btn" id="btn-pdf" type="button">PDF</button>
      <a class="ui-btn" href="../index.html">Lessons</a>
    </div>
  `
  );

  const firstFooter = slides.find((slide) => slide.querySelector(".footer-right"));
  if (firstFooter) {
    const dots = document.createElement("div");
    dots.className = "footer-dots";
    dots.id = "slide-dots";
    slides.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dot";
      btn.setAttribute("aria-label", "Go to slide " + (i + 1));
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        show(i);
      });
      dots.appendChild(btn);
    });
    slides.forEach((slide) => {
      const host = slide.querySelector(".footer-right");
      if (!host) return;
      const clone = dots.cloneNode(true);
      clone.querySelectorAll(".dot").forEach((btn, i) => {
        btn.addEventListener("click", (event) => {
          event.stopPropagation();
          show(i);
        });
      });
      host.prepend(clone);
    });
  }

  let index = 0;
  let timers = [];

  function clearTimers() {
    timers.forEach(clearInterval);
    timers = [];
  }

  function startCycles(slide) {
    slide.querySelectorAll("[data-cycle]").forEach((group) => {
      const items = Array.from(group.querySelectorAll(":scope > .cycle-item"));
      if (!items.length) return;
      let i = 0;
      items.forEach((el, idx) => el.classList.toggle("is-on", idx === 0));
      const id = setInterval(() => {
        i = (i + 1) % items.length;
        items.forEach((el, idx) => el.classList.toggle("is-on", idx === i));
      }, Number(group.dataset.cycle) || 1200);
      timers.push(id);
    });
  }

  function show(next) {
    if (next < 0 || next >= slides.length) return;
    clearTimers();
    slides.forEach((slide) => slide.classList.remove("active", "animating"));
    index = next;
    const current = slides[index];
    current.classList.add("active");
    void current.offsetWidth;
    current.classList.add("animating");
    document.querySelectorAll(".footer-dots .dot").forEach((dot, i) => {
      dot.classList.toggle("active", i % slides.length === index);
    });
    current.querySelectorAll(".footer-meta").forEach((el) => {
      el.textContent = `${index + 1} / ${slides.length}`;
    });
    startCycles(current);
    history.replaceState(null, "", `#slide-${index + 1}`);
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  function toggleFs() {
    if (!document.fullscreenElement) deck.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }

  deck.addEventListener("click", (event) => {
    if (event.target.closest("a, button, .ui-bar, .footer-dots")) return;
    next();
  });
  document.getElementById("btn-fs").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFs();
  });
  document.getElementById("btn-pdf").addEventListener("click", (event) => {
    event.stopPropagation();
    window.print();
  });

  document.addEventListener("keydown", (event) => {
    if (["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
    if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft" || event.key === "PageUp" || event.key === "Backspace") {
      event.preventDefault();
      prev();
    } else if (event.key === "Home") {
      show(0);
    } else if (event.key === "End") {
      show(slides.length - 1);
    } else if (event.key.toLowerCase() === "f" && !event.metaKey && !event.ctrlKey) {
      event.preventDefault();
      toggleFs();
    }
  });

  const hash = Number((location.hash.match(/slide-(\d+)/) || [])[1]);
  show(hash ? hash - 1 : 0);
})();
