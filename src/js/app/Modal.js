/**
 * Modal.js
 */

export default class Modal {
  constructor() {
    this.els = [...document.querySelectorAll('[data-modal-trigger]')];

    if (!this.els.length) {
      return;
    }

    this.init();
  }

  init() {
    this.els.forEach((triggerBtn) => {
      const modal = document.getElementById(triggerBtn.dataset.modalTrigger);
      const closeBtn = modal.querySelector('.modal__close');
      triggerBtn.addEventListener('click', () => this.open(modal));
      closeBtn.addEventListener('click', () => this.close(modal));
    });
  }

  close(el) {
    el.classList.remove('active');
    document.body.classList.remove('js-modal-open');
  }

  open(el) {
    el.classList.add('active');
    document.body.classList.add('js-modal-open');
  }
}
