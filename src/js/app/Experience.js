/**
 * Run.js
 */

import Banner from './Banner';
import FadeIn from './FadeIn';
import Header from './Header';
import Menu from './Menu';
import Modal from './Modal';
import PageTransition from './PageTransition';
import ProgressBar from './ProgressBar';
import ScrollAnimations from './ScrollAnimation';

let instance = null;

export default class Experience {
  constructor() {
    if (instance) {
      // eslint-disable-next-line no-constructor-return
      return instance;
    }

    instance = this;
    window.experience = this;

    this.header = new Header();
    this.menu = new Menu();
    this.transitions = new PageTransition(this);

    this.init();
  }

  init() {
    this.progressBar = new ProgressBar();
    this.banner = new Banner();
    this.modal = new Modal();
    this.scrollAnimations = new ScrollAnimations();
    this.fadeIn = new FadeIn();
  }
}
