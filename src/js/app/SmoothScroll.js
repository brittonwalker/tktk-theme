import Lenis from 'lenis';

export default class SmoothScroll {
  constructor() {
    this.lenis = new Lenis({
      autoRaf: true,
    });
  }

  getLenisInstance() {
    return this.lenis;
  }
}
