type Options = Partial<TabsOptions>;

export interface TabsElement extends HTMLElement {
  tabs?: Tabs;
}

export interface TabsOptions {
  activeClass: string;
  contentSelector: string;
  headerSelector: string;
}

export class Tabs {
  static defaults = {
    activeClass: 'is-active',
    contentSelector: '[data-tabs-content]',
    headerSelector: '[data-tabs-header]',
  };

  element: TabsElement;
  options: TabsOptions;
  tabs: HTMLElement[];
  headers: HTMLAnchorElement[];

  constructor(element: TabsElement, options: Options = {}) {
    if (!element || element.tabs) {
      return;
    }

    element.tabs = this;
    this.element = element;

    this.options = {
      ...Tabs.defaults,
      ...this.element.dataset,
      ...options,
    };

    this.tabs = Array.from(
      this.element.querySelectorAll(this.options.contentSelector),
    );
    this.headers = Array.from(
      this.element.querySelectorAll(this.options.headerSelector),
    );

    this.bind();
    this.loadFragmentIdentifier();
  }

  bind() {
    this.element.addEventListener('click', this.handleClick);
    window.addEventListener('hashchange', this.hashHandler);
  }

  hashHandler = () => {
    this.loadFragmentIdentifier();
  };

  handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const match = target.closest(
      this.options.headerSelector,
    ) as HTMLAnchorElement;

    if (!match) {
      return;
    }

    event.preventDefault();
    this.showTab(match);
  };

  showTab(tab: HTMLAnchorElement | string) {
    const fragment = typeof tab === 'string' ? tab : tab.hash;
    const header = this.getHeaderById(fragment);

    if (!header) {
      return;
    }

    this.toggle(header);
  }

  toggle(element: HTMLAnchorElement) {
    const content = this.element.querySelector(element.hash);

    if (!content) {
      return;
    }

    this.clearTabs();

    element.focus();
    content.classList.add(this.options.activeClass);
    element.classList.add(this.options.activeClass);
  }

  clearTabs() {
    [...this.tabs, ...this.headers].forEach(item =>
      item.classList.remove(this.options.activeClass),
    );
  }

  loadFragmentIdentifier() {
    this.showTab(window.location.hash);
  }

  getHeaderById(id: string) {
    return this.headers.find(item => item.hash === id);
  }

  destroy() {
    this.element.removeEventListener('click', this.handleClick);
    window.removeEventListener('hashchange', this.hashHandler);
    this.element.tabs = undefined;
  }
}
