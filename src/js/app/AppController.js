import Banner from './Banner';
import FadeIn from './FadeIn';
import Header from './Header';
import Modal from './Modal';
import PageTransition from './PageTransition';
import ProgressBar from './ProgressBar';
import ScrollAnimations from './ScrollAnimation';
import SmoothScroll from './SmoothScroll';
import CodeHighlight from './CodeHighlight';
import Accordions from './Accordion';
import Footer from './Footer';
import MenuPush from './MenuPush';
import BlurBg from './BlurBg';

export default class AppController {
  static {
    this.instance = null;
  }

  constructor() {
    if (AppController.instance) {
      return AppController.instance;
    }
    AppController.instance = this;

    window.experience = this;

    this.setup();
  }

  setup() {
    this.header = new Header();
    this.transitions = new PageTransition();

    this.init();
  }

  init() {
    this.progressBar = new ProgressBar();
    this.banner = new Banner();
    this.modal = new Modal();
    this.scrollAnimations = new ScrollAnimations();
    this.fadeIn = new FadeIn();
    this.scroll = new SmoothScroll();
    this.codeHighlight = new CodeHighlight();
    this.accordions = new Accordions();
    this.footer = new Footer();
    this.menuPush = new MenuPush();
    this.blurBg = new BlurBg();
  }
}
