export interface DropdownElement extends HTMLElement {
  dropdown?: Dropdown;
}

export interface DropdownOptions {
  activeClass: string;
  selector: string;
  toggleEl: string;
}

type Options = Partial<DropdownOptions>;

export class Dropdown {
  static defaults = {
    activeClass: 'is-active',
    selector: '[data-dropdown]',
    toggleEl: '[data-dropdown-toggle]',
  };
  options: DropdownOptions;
  element: DropdownElement;
  clickHandler: EventListener;

  constructor(element: DropdownElement, options: Options = {}) {
    if (!element || element.dropdown) {
      return;
    }

    element.dropdown = this;
    this.element = element;
    this.options = {
      ...Dropdown.defaults,
      ...this.element.dataset,
      ...options,
    };

    this.bind();
  }

  bind() {
    this.clickHandler = this.handleClick.bind(this);
    this.element.addEventListener('click', this.clickHandler);
  }

  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const match = target.closest(this.options.toggleEl);

    if (!match) {
      return;
    }

    this.element.classList.toggle(this.options.activeClass);
  }

  destroy() {
    this.element.removeEventListener('click', this.clickHandler);

    this.element.dropdown = undefined;
  }
}
