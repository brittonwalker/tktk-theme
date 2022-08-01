/**
 * Header.js
 */

import Headroom from 'headroom.js';

export default class Header {
  constructor() {
    this.el = document.querySelector('header');
    this.options = {
      offset: this.el.offsetHeight,
    };
    this.init();
  }

  init() {
    const headroom = new Headroom(this.el, this.options);
    headroom.init();
  }
}
