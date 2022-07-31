/**
 * Run.js
 */

import './Header';
import Banner from './Banner';
import FadeIn from './FadeIn';
import Modal from './Modal';
import ProgressBar from './ProgressBar';
import ScrollAnimations from './ScrollAnimation';

export default class Run {
  constructor() {
    this.init();
  }

  init() {
    new ProgressBar();
    new Banner();
    new Modal();
    new ScrollAnimations();
    new FadeIn();
  }
}
