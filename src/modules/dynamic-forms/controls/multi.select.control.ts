import { ControlBase } from './control-base';
/*
        {
            "type": "multiselect",
            "required": true,
            "title": "Do you provide",
            "options": [
                "LPG GAS",
                "Rice",
                "Vegetables",
                "Milk"
            ],
            "order": 5,
            "name": "additionals"
        }
*/
export class MultiSelectControl extends ControlBase<string> {
  controlType = 'multiselect';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}