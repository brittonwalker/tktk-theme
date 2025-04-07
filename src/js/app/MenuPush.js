import { gsap } from 'gsap';

import AppController from './AppController';

export default class MenuPush {
  constructor() {
    this.app = new AppController();
    this.buttonTrigger = document.querySelector('.menu-button');
    this.content = document.querySelector('.content-wrapper');
    this.menu = document.querySelector('.menu');
    this.closeButton = document.querySelector('.menu__close-button');
    this.header = document.querySelector('.header');
    this.menuItems = document.querySelectorAll('.mobile-nav-item');
    this.mainContent = document.querySelector('.content-wrapper');
    this.logo = document.querySelector('.header__logo');
    this.header = document.querySelector('.header');
    this.isOpen = false;

    if (!this.buttonTrigger) {
      console.warn('Menu trigger not found!');
      return;
    }

    this.init();
  }

  init() {
    this.buttonTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.open();
    });

    this.closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    document.addEventListener('click', this.handleClickOutside.bind(this));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    document.addEventListener('focusin', (e) => {
      if (e.target === this.buttonTrigger) {
        this.app.header.headroom.pin();
      }
    });

    this.menu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.trapFocus(e);
      }
    });
  }

  trapFocus(event) {
    if (!this.isOpen) return;

    const focusableElements = [
      ...this.menu.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      ),
    ];

    if (!focusableElements.length) return;

    const firstItem = focusableElements[0];
    const lastItem = focusableElements[focusableElements.length - 1];

    if (event.target === lastItem && event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      firstItem.focus();
    }

    if (event.target === firstItem && event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
      lastItem.focus();
    }
  }

  handleClickOutside(event) {
    if (
      this.isOpen &&
      !this.menu.contains(event.target) &&
      !this.buttonTrigger.contains(event.target)
    ) {
      this.close();
    }
  }

  open() {
    this.app.blurBg.show();
    this.app.scroll.stopScroll();

    gsap.set(this.menu, { visibility: 'visible' });

    gsap.set(this.menuItems, {
      opacity: 0,
      x: 48,
    });

    const tl = gsap.timeline();

    tl.to(this.menu, {
      y: 0,
      pointerEvents: 'auto',
      duration: 0.6,
    });

    tl.to(
      this.mainContent,
      {
        y: 50,
        duration: 0.6,
      },
      0
    );

    tl.to(
      this.menuItems,
      {
        opacity: 1,
        x: 0,
        z: 100,
        duration: 0.6,
        stagger: 0.05,
      },
      '-=0.2'
    );

    this.isOpen = true;
    this.buttonTrigger.setAttribute('aria-expanded', 'true');
    this.menu.setAttribute('aria-hidden', 'false');

    if (this.menuItems.length > 0) {
      this.menuItems[0].focus();
    }
  }

  close() {
    const tl = gsap.timeline();

    tl.to(this.menu, {
      yPercent: -100,
      pointerEvents: 'none',
      duration: 0.5,
      onComplete: () => {
        gsap.set(this.menu, {
          clearProps: 'all',
          visibility: 'hidden',
        });

        setTimeout(() => {
          this.buttonTrigger.focus();
        }, 50);
      },
    });

    tl.to(this.mainContent, { y: 0, duration: 0.6 }, 0);

    this.app.blurBg.hide();
    this.app.scroll.startScroll();

    this.isOpen = false;

    this.menu.removeAttribute('aria-hidden');
    this.buttonTrigger.setAttribute('aria-expanded', 'false');

    this.buttonTrigger.focus();
  }
}
