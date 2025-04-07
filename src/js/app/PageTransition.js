/**
 * PageTransition.js
 */

import barba from '@barba/core';
import { gsap, Power2 } from 'gsap';

import AppController from './AppController';

export default class PageTransition {
  constructor() {
    this.experience = AppController.instance;
    this.transitionEl = document.querySelector('.page-transition');

    if (!this.transitionEl) {
      return;
    }

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
        const isLogout = el.getAttribute('href').includes('wp-login.php?action=logout');

        return isAdminLink || isLogout;
      },
      transitions: [
        {
          name: 'default-transition',
          leave: () => {
            gsap.set(this.transitionEl, { yPercent: 0, top: '100%', height: 0 });

            return gsap.to(this.transitionEl, {
              top: 0,
              height: '100vh',
              duration: 1,
              ease: Power2.easeInOut,
              onComplete: () => {},
            });
          },

          afterEnter: () => {
            gsap.to(this.transitionEl, {
              yPercent: -100,
              height: 0,
              duration: 1,
              delay: 0.5,
              ease: Power2.easeInOut,
              onComplete: () => {
                gsap.set(this.transitionEl, { clearProps: true });
              },
            });
          },

          after: () => {
            this.experience.init();
            this.experience.menuPush.close();
            window.scrollTo(0, 0);
          },
        },
      ],
    });
  }
}
