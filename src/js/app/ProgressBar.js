/**
 * ProgressBar.js
 */

export default class ProgressBar {
  constructor() {
    this.progressBar = document.getElementById('progress-bar');
    this.scrollPercent = 0;
    this.scrollElement = document.querySelector('.content-wrapper');
    this.reachedEndOfArticleContent = false;
    if (!this.progressBar || !this.scrollElement) return;
    this.init();
  }

  init() {
    document.addEventListener('scroll', () => this.scroller(), {
      passive: true,
    });
  }

  scroller() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollBottom =
      (this.scrollElement.offsetHeight + 60 || document.body.scrollHeight) -
      document.documentElement.clientHeight;

    this.scrollPercent = (scrollTop / scrollBottom) * 100;
    this.progressBar.style.setProperty('--scroll', `${this.scrollPercent}%`);

    if (this.scrollPercent > 50 && !this.reachedEndOfArticleContent) {
      this.reachedEndOfArticleContent = true;
    }
  }
}
