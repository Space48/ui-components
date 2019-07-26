type Options = Partial<PlusMinusOptions>;

export interface PlusMinusElement extends HTMLElement {
  plusminus?: PlusMinus;
}

export interface PlusMinusOptions {
  actionEl: string;
  actionData: string;
  changedClass: string;
  fieldEl: string;
  minValue: number;
  selector: string;
}

export class PlusMinus {
  static defaults: PlusMinusOptions = {
    actionData: 'action',
    actionEl: '[data-plusminus-action]',
    changedClass: 'has-changed',
    fieldEl: '[data-plusminus-field]',
    minValue: 1,
    selector: '[data-plusminus]',
  };
  state = {
    initialValue: 1,
  };
  element: PlusMinusElement;
  field: HTMLInputElement;
  minValue: number;
  options: PlusMinusOptions;

  constructor(element: PlusMinusElement, options: Options = {}) {
    if (!element || element.plusminus) {
      return;
    }

    element.plusminus = this;
    this.element = element;
    this.options = {
      ...PlusMinus.defaults,
      ...this.element.dataset,
      ...options,
    };

    const field = this.element.querySelector(
      this.options.fieldEl,
    ) as HTMLInputElement;

    if (!field) {
      return;
    }

    this.field = field;

    const min = this.field.getAttribute('min') || String(this.options.minValue);
    this.minValue = parseInt(min, 10);
    this.state.initialValue = parseInt(this.field.value, 10);

    this.bind();
  }

  bind() {
    this.handleClick = this.handleClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('change', this.handleFieldChange);
  }

  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const match = target.closest(this.options.actionEl);

    if (!match) {
      return;
    }

    const action = target.dataset[this.options.actionData];
    if (action === 'minus') {
      this.update(-1);
      return;
    }

    this.update(+1);
  }

  handleFieldChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const match = target.closest(this.options.fieldEl);

    if (!match) {
      return;
    }

    const val = parseInt(target.value, 10);
    this.decorate(val);
  }

  update(op: number) {
    const val = this.getNewValue(op);

    this.field.value = String(val);
    this.decorate(val);
  }

  getNewValue(operator: number) {
    const val = parseInt(this.field.value, 10);

    if (val + operator <= this.minValue || isNaN(val)) {
      return this.minValue;
    }

    return val + operator;
  }

  decorate(val: number) {
    this.element.classList.toggle(
      this.options.changedClass,
      val !== this.state.initialValue,
    );
  }

  destroy() {
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('change', this.handleFieldChange);

    this.element.plusminus = undefined;
  }
}
