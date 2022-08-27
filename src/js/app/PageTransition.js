/**
 * PageTransition.js
 */

import barba from '@barba/core';
import { gsap, Power2 } from 'gsap';

export default class PageTransition {
  constructor(experience) {
    this.experience = experience;
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
          leave: () => {
            gsap.set(this.transitionEl, { xPercent: 0, width: 0 });

            return gsap.to(this.transitionEl, {
              width: '100vw',
              duration: 1,
              ease: Power2.easeInOut,
              onComplete: () => {
                this.experience.menu.out();
              },
            });
          },

          afterEnter: () => {
            gsap.to(this.transitionEl, {
              xPercent: 100,
              duration: 1,
              delay: 0.5,
              ease: Power2.easeInOut,
            });
          },

          after: () => {
            this.experience.init();
            window.scrollTo(0, 0);
          },
        },
      ],
    });
  }
}
