/**
 * FadeIn.js
 */

import { gsap, Power4 } from 'gsap';
import { isInViewport } from './utils';

export default class FadeIn {
  constructor() {
    this.els = document.querySelectorAll('.fade-in');
    this.init();
  }

  init() {
    this.els.forEach((el) => {
      gsap.set(el, {
        opacity: 0,
        y: 150,
      });
      this.in(el);
      window.addEventListener('scroll', () => this.in(el));
    });
  }

  in(el) {
    if (isInViewport(el)) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        ease: Power4.easeOut,
        duration: 2.5,
      });
    }
  }
}
