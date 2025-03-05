/**
 * Accordions.js
 */

const BUTTON_CLASS = '.accordion__button';
const ACCORDION_ITEM_CLASS = '.accordion__item';
const ACCORDION_BODY_CLASS = '.accordion__collapse';
const COLLAPSED_CLASS = 'collapsed';

export default class Accordions {
  constructor() {
    this.accordions = [...document.querySelectorAll('.accordion')];
    if (!this.accordions) return;
    this.init();
  }

  init() {
    this.accordions.forEach((accordion) => {
      this.buildAccordion(accordion);
    });
  }

  buildAccordion(element) {
    const items = [...element.querySelectorAll(ACCORDION_ITEM_CLASS)];
    items.forEach((item) => {
      const arccordionItem = {
        parent: item,
        btn: item.querySelector(BUTTON_CLASS),
        collapse: item.querySelector(ACCORDION_BODY_CLASS),
      };
      arccordionItem.btn.addEventListener('click', () =>
        this.handleClick(arccordionItem)
      );
    });
  }

  handleClick({ btn, collapse }) {
    if (collapse.classList.contains(COLLAPSED_CLASS)) {
      collapse.classList.remove(COLLAPSED_CLASS);
      collapse.style.maxHeight = `${collapse.scrollHeight}px`;
      btn.setAttribute('aria-expanded', true);
    } else {
      collapse.classList.add(COLLAPSED_CLASS);
      collapse.style.maxHeight = 0;
      btn.setAttribute('aria-expanded', false);
    }
  }
}
