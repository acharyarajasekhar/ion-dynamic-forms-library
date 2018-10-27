import { Component } from '@angular/core';
import { ControlBase } from '../../../library';
import { FormGroup } from '@angular/forms';
import { ControlsService } from '../../../library';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  controls: ControlBase<any>[];
  form: FormGroup;
  formData: any;

  constructor(private controlsSvc: ControlsService) { this.form = new FormGroup({}); }

  ngOnInit() {
    this.controls = this.controlsSvc.getControls(formControls);
    this.form.valueChanges
      .subscribe(val => {
        this.formData = val;
      });
  }

  submitForm(event) {
    console.log(this.formData);
  }

}

const formControls: any = [
  {
    "order": 0,
    "name": "name",
    "type": "text",
    "required": true,
    "icon": "arrow-forward",
    "title": "Name"
  },
  {
    "order": 1,
    "name": "description",
    "type": "textarea",
    "required": true,
    "icon": "arrow-forward",
    "title": "Description"
  },
  {
    "order": 2,
    "title": "Cover Photos",
    "name": "photos",
    "required": false,
    "type": "photos",
    "max": 5
  },
  {
    "type": "number",
    "required": true,
    "icon": "arrow-forward",
    "title": "Contact Number",
    "order": 3,
    "name": "phone"
  },
  {
    "order": 4,
    "title": "Address",
    "name": "address",
    "required": true,
    "type": "address"
  }
];
