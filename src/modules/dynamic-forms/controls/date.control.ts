import { ControlBase } from './control-base';

export class DateControl extends ControlBase<string> {
  controlType = 'date';

  constructor(options: {} = {}) {
    super(options);
  }
}