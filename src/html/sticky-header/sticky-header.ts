import {debounce, throttle} from 'throttle-debounce';

type Options = Partial<StickyHeaderOptions>;

export interface StickyHeaderElement extends HTMLElement {
  stickyheader?: StickyHeader;
}

interface StickyHeaderOptions {
  activeClass: string;
  staticClass: string;
  initClass: string;
  minScroll: number;
}

export class StickyHeader {
  static defaults: StickyHeaderOptions = {
    activeClass: 'is-sticky',
    initClass: 'sticky-header',
    minScroll: 50,
    staticClass: 'is-static',
  };
  options: StickyHeaderOptions;
  element: StickyHeaderElement;
  lastOffset: number = 0;
  elementOffset: number = 0;
  throttleHandler: EventListener;
  debounceHandler: EventListener;

  constructor(element: StickyHeaderElement, options: Options = {}) {
    if (!element || element.stickyheader) {
      return;
    }

    element.stickyheader = this;
    this.element = element;
    this.options = {
      ...StickyHeader.defaults,
      ...this.element.dataset,
      ...options,
    };

    this.element.classList.add(this.options.initClass);

    this.bind();

    const offset = this.getElementOffset();
    if (offset > 0) {
      this.update(offset);
    }
  }

  bind() {
    this.throttleHandler = throttle(300, this.recalc.bind(this));
    this.debounceHandler = debounce(300, this.recalc.bind(this));
    window.addEventListener('scroll', this.throttleHandler);
    window.addEventListener('resize', this.debounceHandler);
  }

  recalc() {
    const offset = this.getElementOffset();
    this.update(offset);
  }

  update(offset: number) {
    const change = window.pageYOffset - this.lastOffset;
    this.lastOffset = window.pageYOffset;

    if (window.pageYOffset <= offset) {
      this.setActive();
      return;
    }

    if (change > 0) {
      if (this.isActive()) {
        this.removeActive();
      }

      return;
    }

    if (Math.abs(change) >= this.options.minScroll) {
      this.setActive();
    }
  }

  getElementOffset(): number {
    return this.element.scrollTop + this.element.clientHeight;
  }

  setActive() {
    this.element.classList.add(this.options.activeClass);
    this.element.classList.remove(this.options.staticClass);
  }

  removeActive() {
    this.element.classList.remove(this.options.activeClass);
    this.element.classList.add(this.options.staticClass);
  }

  isActive(): boolean {
    return this.element.classList.contains(this.options.activeClass);
  }

  destroy() {
    window.removeEventListener('scroll', this.throttleHandler);
    window.removeEventListener('resize', this.debounceHandler);

    this.element.stickyheader = undefined;
  }
}
