export default class Navigation {
  constructor() {
    this.els = {
      styleguide: document.querySelector('.styleguide'),
      buttons: document.querySelectorAll('.styleguide-list__button'),
    };

    this.init();
  }

  init() {
    this.els.buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        button.classList.toggle('styleguide-list__button--expanded');
        const target = button.nextElementSibling;
        target.classList.toggle('styleguide-list__sublist--active');
      });
    });

    this.getVars();
  }

  getVars() {
    // get data-heading
    const headings = document.querySelectorAll('[data-heading]');
    if (!headings.length) return;

    headings.forEach((heading) => {
      const className = heading.dataset.heading;
      const el = document.querySelector(className);
      const styles = window.getComputedStyle(el);

      const mobile = heading.querySelector('[data-mobile]');
      const desktop = heading.querySelector('[data-desktop]');

      const fontSize = styles.fontSize;
      const lineHeight = styles.lineHeight;

      if (desktop) {
        desktop.innerHTML = `
          ${fontSize} / ${lineHeight}
        `;
      }
    });
  }
}
