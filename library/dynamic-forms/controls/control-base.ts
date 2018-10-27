export class ControlBase<T> {
    value: T;
    name: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    icon: string;
  
    constructor(options: {
      value?: T,
      name?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      icon?: string
    } = {}) {
      this.value = options.value;
      this.name = options.name || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.icon = options.icon || '';
    }
  }