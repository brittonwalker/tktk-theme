import EventEmitter from './EventEmitter';

export default class Component extends EventEmitter {
  constructor({ element, elements }) {
    super();
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };

    this.create();
  }
  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    Object.entries(this.selectorChildren).forEach(([key, entry]) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = this.element.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });
  }
}
