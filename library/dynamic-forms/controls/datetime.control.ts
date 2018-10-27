import { ControlBase } from './control-base';

export class DateTimeControl extends ControlBase<string> {
  controlType = 'datetime';

  constructor(options: {} = {}) {
    super(options);
  }
}