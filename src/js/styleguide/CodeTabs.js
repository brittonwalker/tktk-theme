/**
 * CodeTabs.js
 */

export default class CodeTabs {
  constructor() {
    this.codeBlocks = document.querySelectorAll('.code-block');
    this.copied = false;
    if (!this.codeBlocks.length) {
      return;
    }
    this.init();
  }

  init() {
    this.codeBlocks.forEach((block) => {
      const btns = block.querySelectorAll('.js-lang-tab');
      if (!btns.length) return;
      btns.forEach((btn) => {
        btn.addEventListener('click', () => this.clickTab(block, btn));
      });
      const copyBtn = block.querySelector('.js-copy-btn');
      const toggleSwitch = block.querySelector('.toggle-switch');
      this.handleToggleSwitch(block, toggleSwitch);
      copyBtn.addEventListener('click', () => this.copyToClipBoard(block, copyBtn));
    });
  }

  clickTab(block, btn) {
    const lang = btn.dataset.langBtn;
    const langTab = block.querySelector(`[data-lang="${lang}"`);
    const activeBtn = block.querySelector(`.code-block__btn.active`);
    const activeTab = block.querySelector(`[data-lang].active`);
    activeBtn.classList.remove('active');
    activeTab.classList.remove('active');
    btn.classList.add('active');
    langTab.classList.add('active');
  }

  copyToClipBoard(block, btn) {
    const activeTab = block.querySelector(`[data-lang].active`);
    navigator.clipboard.writeText(activeTab.innerText).then(() => {
      this.copied = true;
      btn.innerText = 'Copied!';
      btn.classList.add('active');
      const copyTimeout = () =>
        setTimeout(() => {
          this.copied = false;
          btn.innerText = 'Copy';
          btn.classList.remove('active');
        }, 1500);
      copyTimeout();
      clearTimeout(copyTimeout);
    });
  }

  handleToggleSwitch(block, toggleSwitch) {
    const btns = toggleSwitch.querySelectorAll('.toggle-switch__btn');
    let activeBtn = toggleSwitch.querySelector('.toggle-switch__btn.active');
    const oberserver = block.querySelector('.toggle-switch__observer');

    oberserver.style.width = `${activeBtn.offsetWidth}px`;
    oberserver.style.left = `${activeBtn.offsetLeft}px`;
    btns.forEach((btn) => {
      btn.addEventListener('click', ({ target }) => {
        activeBtn.classList.remove('active');
        activeBtn = target;
        target.classList.add('active');
        oberserver.style.width = `${target.offsetWidth}px`;
        oberserver.style.left = `${activeBtn.offsetLeft}px`;
        this.showSelection(block, activeBtn);
      });
    });
  }

  showSelection(block, activeBtn) {
    const previews = [
      block.querySelector('.code-block__preview'),
      block.querySelector('.code-block__container'),
    ];
    const hiddenClass = 'code-block__hidden';
    if (activeBtn.dataset.preview === 'preview') {
      previews[0].classList.remove(`${hiddenClass}`);
      previews[1].classList.add(`${hiddenClass}`);
    } else {
      previews[0].classList.add(`${hiddenClass}`);
      previews[1].classList.remove(`${hiddenClass}`);
    }
  }
}
