export default class BlurBg {
  constructor() {
    this.element = document.querySelector('.blur-bg');
  }

  show() {
    this.element.classList.add('active');
  }

  hide() {
    this.element.classList.remove('active');
  }
}
