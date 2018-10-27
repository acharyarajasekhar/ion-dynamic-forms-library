import { ControlBase } from './control-base';

export class TimeControl extends ControlBase<string> {
  controlType = 'time';

  constructor(options: {} = {}) {
    super(options);
  }
}