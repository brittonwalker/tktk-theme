/**
 * ScrollAnimations.js
 */

import { isInViewport } from './utils';

const STATE_CLASS = '__revealed';

export default class ScrollAnimations {
  constructor() {
    this.scrollEls = document.querySelectorAll('.to-reveal');
    if (!this.scrollEls) return;
    this.init();
  }

  init() {
    this.scrollEls.forEach((el) => {
      window.addEventListener('scroll', () => this.animate(el), false);
    });
  }

  animate(el) {
    if (isInViewport(el)) {
      if (!el.classList.contains(STATE_CLASS)) {
        el.classList.add(STATE_CLASS);
      }
      window.removeEventListener('scroll', () => this.animate(el), false);
    }
  }
}
