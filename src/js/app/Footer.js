export default class Footer {
  constructor() {
    this.footer = document.querySelector('.site-footer');
    this.wrapper = document.querySelector('.site-footer__fixed');
    this.init();
  }

  init() {
    if (!this.footer || !this.wrapper) {
      console.warn('Footer or wrapper not found!');
      return;
    }
    this.updateFooterHeight();
    window.addEventListener('resize', this.updateFooterHeight.bind(this));
  }

  updateFooterHeight() {
    const wrapperHeight = this.wrapper.offsetHeight;
    this.footer.style.minHeight = `${wrapperHeight}px`;
    document.documentElement.style.setProperty('--footer-height', `${wrapperHeight}px`);
  }
}
