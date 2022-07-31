/**
 * PageTransition.js
 */

import barba from '@barba/core';
import { gsap, Power2 } from 'gsap';
import FadeInText from './FadeInText';
import Run from './Run';

class PageTransition {
  constructor() {
    this.transitionEl = document.querySelector('.page-transition');
    this.text = this.transitionEl.querySelector('.page-transition__loading');
    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  init() {
    barba.init({
      debug: true,
      prevent: ({ el }) => {
        const isAdminLink = document.getElementById('wpadminbar')
          ? document.getElementById('wpadminbar').contains(el)
          : false;
        const isLogout = el
          .getAttribute('href')
          .includes('wp-login.php?action=logout');

        return isAdminLink || isLogout;
      },
      transitions: [
        {
          name: 'default-transition',
          leave: (data) => {
            const { trigger, current } = data;
            const { container } = current;

            gsap.set(this.transitionEl, { xPercent: 0, width: 0 });

            return gsap.to(this.transitionEl, {
              width: '100vw',
              duration: 1,
              ease: Power2.easeInOut,
              onComplete: () => {
                window.headerMenu.out();
              },
            });
          },

          enter: (data) => {
            const { trigger } = data;
          },

          afterEnter: (data) => {
            gsap.to(this.transitionEl, {
              xPercent: 100,
              duration: 1,
              delay: 0.5,
              ease: Power2.easeInOut,
              onComplete: () => {
                new FadeInText();
              },
            });
          },

          after: (data) => {
            const { trigger } = data;

            new Run();
            window.scrollTo(0, 0);
          },
        },
      ],
    });
  }
}
new PageTransition();
