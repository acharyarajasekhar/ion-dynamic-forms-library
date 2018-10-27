import { ControlBase } from './control-base';

export class AddressControl extends ControlBase<any> {
  controlType = 'address';

  constructor(options: {} = {}) {
    super(options);
  }
}