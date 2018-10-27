import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlBase } from '../controls/control-base';

@Injectable()
export class DynamicControlsService {
  toFormGroup(formGroup: FormGroup, controls: ControlBase<any>[]) {
    
    formGroup = formGroup || new FormGroup({});

    controls.forEach(control => {
      let formControl = control.required
        ? new FormControl(control.value || '', Validators.required)
        : new FormControl(control.value || '');
      formGroup.addControl(control.name, formControl);
    });
    
    return formGroup;
    
  }
}
