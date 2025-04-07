import PageTransition from './PageTransition';
import Navigation from './Navigation';
import Typography from './Typography';
import CodeTabs from './CodeTabs';

export default class StyleguideController {
  static {
    this.instance = null;
  }

  constructor() {
    if (StyleguideController.instance) {
      return StyleguideController.instance;
    }
    StyleguideController.instance = this;

    window.styleguide = this;

    this.setup();
  }

  setup() {
    this.navigation = new Navigation();
    this.transitions = new PageTransition();

    this.init();
  }

  init() {
    console.log('StyleguideController init');
    this.typography = new Typography();
    this.codeTabs = new CodeTabs();
  }
}
