(function (global) {
  const asset = (name) => new URL("../assets/" + name, document.currentScript.src).href;
  const LOGO = asset("broadway_logo.webp");
  const LOGO_WHITE = asset("broadway_white_logo.png");
  const ISO = asset("iso_logo.png");

  const CONTACT = {
    address: "Shree Ganesh Marg, Subidhanagar, Tinkune, Kathmandu",
    phones: "01-4117578 / 4111849 / 9841002000",
    phonesIntl: "+977-1-4117578 / 4111849 / 9841002000",
    web: "www.broadwayinfosys.com",
    webUrl: "https://www.broadwayinfosys.com",
  };

  function startSlide(meta) {
    return `
      <section class="slide brand-slide" data-brand="start">
        <div class="brand-hero">
          <div class="brand-top reveal">
            <img class="brand-logo-img" src="${LOGO_WHITE}" alt="Broadway Infosys">
            <img class="iso-img" src="${ISO}" alt="ISO 9001:2015 Certified Company">
          </div>
          <div class="brand-center">
            <h1 class="reveal">Building Global IT<br>Professionals <em>since 2008</em></h1>
            <div class="accent-line reveal"></div>
          </div>
          <div class="stats-row">
            <div class="reveal"><span class="stat-num">19K+</span><span class="stat-label">Certified Students</span></div>
            <div class="reveal"><span class="stat-num">160+</span><span class="stat-label">Courses</span></div>
            <div class="reveal"><span class="stat-num">85+</span><span class="stat-label">Qualified Teachers</span></div>
          </div>
          <a class="brand-web" href="${CONTACT.webUrl}" target="_blank" rel="noreferrer">${CONTACT.web}</a>
          <div class="lesson-chip">${meta.lesson} · ${meta.title}</div>
        </div>
      </section>`;
  }

  function titleSlide(meta) {
    const pills = (meta.topics || [])
      .map((topic) => `<span>${topic}</span>`)
      .join("");
    return `
      <section class="slide" data-brand="title">
        <div class="slide-inner title-slide">
          <p class="kicker reveal">${meta.module}</p>
          <h2 class="slide-title reveal">${meta.lesson} ${meta.title}</h2>
          <div class="topic-pills reveal">${pills}</div>
        </div>
      </section>`;
  }

  function thankYouSlide() {
    return `
      <section class="slide brand-slide" data-brand="thanks">
        <div class="brand-thanks">
          <div class="thanks-wrap">
            <h1 class="reveal">THANK YOU!</h1>
            <div class="accent-line reveal"></div>
            <img class="thanks-logo reveal" src="${LOGO_WHITE}" alt="Broadway Infosys">
            <div class="thanks-contact">
              ${CONTACT.address}<br>
              ${CONTACT.phones}<br>
              ${CONTACT.web}
            </div>
          </div>
        </div>
      </section>`;
  }

  function footer(meta, current, total) {
    return `
      <footer class="brand-footer">
        <div class="footer-left">
          <img class="footer-logo" src="${LOGO_WHITE}" alt="Broadway Infosys">
        </div>
        <div class="footer-mid">
          <div class="footer-item">${CONTACT.web}</div>
          <div class="footer-item">${CONTACT.phonesIntl}</div>
          <div class="footer-item">${CONTACT.address}</div>
        </div>
        <div class="footer-right">
          <span class="footer-meta">${current} / ${total}</span>
        </div>
      </footer>`;
  }

  global.Brand = { LOGO, LOGO_WHITE, ISO, CONTACT, startSlide, titleSlide, thankYouSlide, footer };
})(window);
