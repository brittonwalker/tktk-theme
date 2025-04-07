/**
 * Menu.js
 */

export default class Menu {
  constructor() {
    this.DOM = {
      el: document.getElementById('menu'),
      menu: document.querySelector('.menu'),
      navItems: document.querySelectorAll('.mobile-nav-item'),
    };

    this.bindEvents();
  }

  bindEvents() {
    console.log(this.DOM.el);
    this.DOM.el.addEventListener('click', () => this.menuState());
  }

  menuState() {
    if (document.body.classList.contains('menu-active')) {
      this.out();
    } else {
      this.in();
    }
  }

  in() {
    document.body.classList.add('menu-active');
  }

  out() {
    document.body.classList.remove('menu-active');
  }
}
