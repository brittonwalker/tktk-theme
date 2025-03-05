import Banner from './app/Banner';
import FadeIn from './app/FadeIn';
import Header from './app/Header';
import Menu from './app/Menu';
import Modal from './app/Modal';
import PageTransition from './app/PageTransition';
import ProgressBar from './app/ProgressBar';
import ScrollAnimations from './app/ScrollAnimation';
import SmoothScroll from './app/SmoothScroll';
import CodeHighlight from './app/CodeHighlight';
import Accordions from './app/Accordion';
import CodeTabs from './app/CodeTabs';

class App {
  static instance = null;

  constructor() {
    if (App.instance) {
      return App.instance;
    }
    App.instance = this;

    window.experience = this;

    this.header = new Header();
    this.menu = new Menu();
    this.transitions = new PageTransition(this);

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
    this.codeTabs = new CodeTabs();
  }
}

new App();
