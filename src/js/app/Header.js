/**
 * Header.js
 */

import Headroom from 'headroom.js';

export default class Header {
  constructor() {
    if (!document.querySelector('header')) {
      return;
    }

    this.el = document.querySelector('header');
    this.headroom = null;
    this.options = {
      offset: this.el.offsetHeight || 0,
    };
    this.init();
  }

  init() {
    this.headroom = new Headroom(this.el, this.options);
    this.headroom.init();
  }
}
