/**
 * Banner.js
 */

export default class Banner {
  constructor() {
    this.banners = [...document.querySelectorAll('.banner')];
    if (!this.banners) {
      return;
    }
    this.init();
  }

  init() {
    this.banners.forEach((banner) => {
      const bannerClose = banner.querySelector('.banner__close');
      this.setHeight(banner);
      bannerClose.addEventListener('click', () => this.close(banner));
      window.addEventListener('resize', () => this.setHeight(banner));
    });
  }

  close(el) {
    el.classList.add('banner--closed');
    el.removeAttribute('style');
  }

  setHeight(el) {
    el.style.height = null;
    el.style.height = `${el.offsetHeight}px`;
  }
}
