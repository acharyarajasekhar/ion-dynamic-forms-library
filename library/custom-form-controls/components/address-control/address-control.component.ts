import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular';
import { PostalAddressApiService } from '../../services/postal-address-api.service';

@Component({
  selector: 'address-control',
  templateUrl: 'address-control.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressControlComponent),
    multi: true
  }],
  styleUrls: ['address-control.component.scss']
})
export class AddressControlComponent implements ControlValueAccessor {

  line: string;
  postalCode: number;
  postal: any = {};

  get Line1() {
    return this.line;
  }

  set Line1(value) {
    this.line = value;
    this.onAddressChange(null);
  }

  private onChange: Function = (value: any) => { };

  constructor(private postalAddressApi: PostalAddressApiService, private actionSheetCtrl: ActionSheetController) { }

  CheckPinCode(pinCode) {
    if (pinCode) {
      this.postalAddressApi.getDetailsByPINCode(pinCode).then(list => {
        let buttons = [];
        for (let office of list) {
          let button = {
            text: office.officename,
            handler: () => {
              this.postal = office;
              this.onAddressChange(null);
              return true;
            }
          }
          buttons.push(button);
        }

        let actionSheet = this.actionSheetCtrl.create({
          title: 'Choose your post office',
          buttons: buttons
        });

        actionSheet.present();
      });
    }
  }

  onAddressChange(event) {
    this.onChange({ ...this.postal, line: this.line });
  }

  // Allow Angular to set the value on the component
  writeValue(value: any): void {
    if (value != undefined) {
      this.line = value.line;
      this.postal = value;
      this.postalCode = value.pincode;
    }
  }

  // Save a reference to the change function passed to us by
  // the Angular form control
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Save a reference to the touched function passed to us by
  // the Angular form control
  registerOnTouched(): void { }

  // Allow the Angular form control to disable this input
  setDisabledState?(): void { }

}
