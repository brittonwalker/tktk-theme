import { gsap } from 'gsap';
import SplitType from 'split-type';
import { wrapLines } from './utils';

export default class TextLinesReveal {
  constructor(animationElems) {
    this.DOM = {
      animationElems: Array.isArray(animationElems)
        ? animationElems
        : [animationElems],
    };

    // array of SplitType instances
    this.SplitTypeInstances = [];
    // array of all HTML .line
    this.lines = [];

    for (const el of this.DOM.animationElems) {
      const SplitTypeInstance = new SplitType(el, { types: 'lines' });
      // wrap the lines (div with class .oh)
      // the inner child will be the one animating the transform
      wrapLines(SplitTypeInstance.lines, 'div', 'overflow-hidden');
      this.lines.push(SplitTypeInstance.lines);
      // keep a reference to the SplitType instance
      this.SplitTypeInstances.push(SplitTypeInstance);
    }

    this.initEvents();
  }

  in() {
    // lines are visible
    this.isVisible = true;

    // animation
    gsap.killTweensOf(this.lines);
    return gsap
      .timeline({ defaults: { duration: 1.2, ease: 'expo' } })
      .set(this.lines, {
        y: '150%',
        // rotate: 15
      })
      .to(
        this.lines,
        {
          y: '0%',
          // rotate: 0,
          stagger: 0.04,
        },
        0.5
      );
  }

  out() {
    // lines are invisible
    this.isVisible = false;

    // animation
    gsap.killTweensOf(this.lines);
    return gsap
      .timeline({
        defaults: { duration: 0.7, ease: 'power2' },
      })
      .to(this.lines, {
        y: '-150%',
        rotate: -5,
        stagger: 0.02,
      });
  }

  initEvents() {
    window.addEventListener('resize', () => {
      // empty the lines array
      this.lines = [];
      // re initialize the Split Text
      for (const instance of this.SplitTypeInstances) {
        // re-split text
        // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
        instance.split();

        // need to wrap again the new lines elements (div with class .oh)
        wrapLines(instance.lines, 'div', 'overflow-hidden');
        this.lines.push(instance.lines);
      }
      // hide the lines
      if (!this.isVisible) {
        gsap.set(this.lines, { y: '-150%' });
      }
    });
  }
}
