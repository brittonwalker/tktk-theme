import Lenis from 'lenis';

export default class Scroll {
  constructor() {
    this.lenis = new Lenis({
      autoRaf: true,
    });
  }

  getLenisInstance() {
    return this.lenis;
  }
}
