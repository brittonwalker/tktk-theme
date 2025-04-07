/**
 * PageTransition.js
 */

import barba from '@barba/core';
import { gsap, Power2 } from 'gsap';

import StyleguideController from './StyleguideController';

export default class PageTransition {
  constructor() {
    this.experience = StyleguideController.instance;

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
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0,
            });
          },
          enter(data) {
            console.log(data.next.container);
            gsap.from(data.next.container, {
              opacity: 0,
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
