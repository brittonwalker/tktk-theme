/**
 * FadeInText.js
 */

import { gsap, Power4 } from 'gsap';
import { isInViewport } from './utils';

export default class FadeInText {
  constructor() {
    this.els = document.querySelectorAll('.fade-in-text');
    this.init();
  }

  init() {
    this.els.forEach((el) => {
      this.in(el);
      window.addEventListener('scroll', () => this.in(el));
    });
  }

  in(el) {
    if (isInViewport(el, -100)) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        ease: Power4.easeOut,
        duration: 2,
      });
    }
  }
}
