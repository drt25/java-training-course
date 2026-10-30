(function () {
  let timers = [];
  let simActive = false;

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

  function showJobs(slide) {
    const root = slide.querySelector("[data-demo='jobs']");
    if (!root) return;
    const jobs = Array.from(root.querySelectorAll("[data-job]"));
    const caption = root.querySelector("[data-jobs-caption]");
    const hand = "A person checks one method by running the application.";
    const auto = "JUnit checks all four and stamps each one.";
    if (!jobs.length) return;

    function clear() {
      jobs.forEach((job) => job.classList.remove("is-on", "is-pass"));
    }

    if (reduced()) {
      jobs.forEach((job) => job.classList.add("is-on", "is-pass"));
      if (caption) caption.textContent = auto;
      return;
    }

    let junit = true;

    function play() {
      if (!simActive) return;
      clear();
      junit = !junit;
      if (!junit) {
        if (caption) caption.textContent = hand;
        later(() => jobs[0].classList.add("is-on"), 350);
        later(play, 2800);
        return;
      }
      if (caption) caption.textContent = auto;
      jobs.forEach((job, index) => {
        later(() => job.classList.add("is-on", "is-pass"), 280 + index * 420);
      });
      later(play, 3200);
    }

    play();
  }

  function showScore(slide) {
    const root = slide.querySelector("[data-demo='score']");
    if (!root) return;
    const call = root.querySelector("[data-score-call]");
    const expected = root.querySelector("[data-score-expected]");
    const actual = root.querySelector("[data-score-actual]");
    const verdict = root.querySelector("[data-score-verdict]");
    const verdictText = root.querySelector("[data-score-verdict-text]");
    const caption = root.querySelector("[data-score-caption]");
    const stories = [
      {
        actual: "30",
        verdict: "Pass",
        kind: "is-pass",
        caption: "The test passes when the expected number and the actual number match."
      },
      {
        actual: "25",
        verdict: "Fail",
        kind: "is-fail",
        caption: "The method returned 25. Expected was 30, so the test fails."
      }
    ];
    if (!expected || !actual || !verdict || !verdictText) return;

    function paint(story) {
      if (call) call.textContent = "add(10, 20)";
      expected.textContent = "30";
      actual.textContent = story.actual;
      verdictText.textContent = story.verdict;
      verdict.classList.remove("is-pass", "is-fail");
      verdict.classList.add(story.kind);
      if (caption) caption.textContent = story.caption;
    }

    if (reduced()) {
      paint(stories[0]);
      return;
    }

    let index = 0;

    function play() {
      if (!simActive) return;
      const story = stories[index % stories.length];
      index += 1;
      if (call) call.textContent = "add(10, 20)";
      expected.textContent = "—";
      actual.textContent = "—";
      verdictText.textContent = "…";
      verdict.classList.remove("is-pass", "is-fail");
      if (caption) caption.textContent = "JUnit runs add(10, 20).";
      later(() => {
        expected.textContent = "30";
      }, 450);
      later(() => {
        actual.textContent = story.actual;
      }, 1000);
      later(() => paint(story), 1600);
      later(play, 4600);
    }

    play();
  }

  function showAround(slide) {
    const root = slide.querySelector("[data-demo='around']");
    if (!root) return;
    const beforeAll = root.querySelector("[data-life='all-before']");
    const before = root.querySelector("[data-life='before']");
    const test = root.querySelector("[data-life='test']");
    const after = root.querySelector("[data-life='after']");
    const afterAll = root.querySelector("[data-life='all-after']");
    const name = root.querySelector("[data-life-name]");
    const caption = root.querySelector("[data-life-caption]");
    const tests = ["testAddition", "testSubtraction"];
    const order = "BeforeAll runs once. Each test gets BeforeEach, the test, and AfterEach. AfterAll runs once.";

    function clearRow() {
      [before, test, after].forEach((node) => {
        if (node) node.classList.remove("is-on");
      });
    }

    if (reduced()) {
      [beforeAll, before, test, after, afterAll].forEach((node) => {
        if (node) node.classList.add("is-on");
      });
      if (name) name.textContent = "testAddition";
      if (caption) caption.textContent = order;
      return;
    }

    function play() {
      if (!simActive) return;
      [beforeAll, before, test, after, afterAll].forEach((node) => {
        if (node) node.classList.remove("is-on");
      });
      if (caption) caption.textContent = "BeforeAll runs once, before any test.";
      later(() => beforeAll && beforeAll.classList.add("is-on"), 300);
      tests.forEach((testName, index) => {
        const start = 1100 + index * 1800;
        later(() => {
          clearRow();
          if (before) before.classList.add("is-on");
          if (caption) caption.textContent = "BeforeEach runs before " + testName + ".";
        }, start);
        later(() => {
          if (name) name.textContent = testName;
          if (test) test.classList.add("is-on");
          if (caption) caption.textContent = testName + " runs.";
        }, start + 500);
        later(() => {
          if (after) after.classList.add("is-on");
          if (caption) caption.textContent = "AfterEach runs after " + testName + ".";
        }, start + 1000);
      });
      later(() => {
        if (afterAll) afterAll.classList.add("is-on");
        if (caption) caption.textContent = "AfterAll runs once, after every test.";
      }, 1100 + tests.length * 1800);
      later(play, 2200 + tests.length * 1800);
    }

    play();
  }

  function onShow(event) {
    const slide = event.detail && event.detail.slide;
    if (!slide) return;
    clearTimers();
    simActive = true;
    showJobs(slide);
    showScore(slide);
    showAround(slide);
  }

  window.addEventListener("lesson-slide-show", onShow);
  onShow({ detail: { slide: document.querySelector("#lesson-slides > .slide.active") } });
})();
