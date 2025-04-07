export default class Typography {
  constructor() {
    this.init();
  }

  init() {
    this.getVars();
    this.getDataValue();
  }

  getDataValue() {
    const items = document.querySelectorAll('[data-value]');

    if (!items.length) return;

    items.forEach((item) => {
      const value = item.dataset.value;
      // value is a css variable, so we need to get the value of the css variable
      const cssValue = getComputedStyle(document.documentElement).getPropertyValue(value);
      if (!cssValue) return;

      console.log(item);

      item.innerHTML = cssValue;
    });
  }

  getVars() {
    const type = document.querySelectorAll('[data-type]');

    if (!type.length) return;

    type.forEach((heading) => {
      const json = heading.dataset.type ? JSON.parse(heading.dataset.type) : null;
      if (!json) return;

      const mobile = heading.querySelector('[data-mobile]');
      const desktop = heading.querySelector('[data-desktop]');

      if (desktop) {
        const { fontSize, lineHeight } = this.getValues(json.desktop);
        desktop.innerHTML = `
          ${fontSize} / ${lineHeight}
        `;
      }

      if (mobile) {
        const { fontSize, lineHeight } = this.getValues(json.mobile);
        mobile.innerHTML = `
          ${fontSize} / ${lineHeight}
        `;
      }
    });
  }

  getValues(data) {
    const { fontSize, lineHeight } = data;
    const fontSizeValue = getComputedStyle(document.documentElement).getPropertyValue(fontSize);
    const lineHeightValue = getComputedStyle(document.documentElement).getPropertyValue(lineHeight);

    return {
      fontSize: fontSizeValue,
      lineHeight: lineHeightValue,
    };
  }
}
