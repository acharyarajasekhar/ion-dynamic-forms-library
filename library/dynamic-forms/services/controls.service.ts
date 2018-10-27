import { Injectable } from '@angular/core';
import { ControlDescriptor } from '../controls/control';
import { TextboxControl } from '../controls/textbox.control';
import { TextareaControl } from '../controls/textarea.control';
import { SelectControl } from '../controls/select.control';
import { MultiSelectControl } from '../controls/multi.select.control';
import { RangeControl } from '../controls/range.control';
import { CurrencyControl } from '../controls/currency.control';
import { AddressControl } from '../controls/address.control';
import { DateControl } from '../controls/date.control';
import { TimeControl } from '../controls/time.control';
import { DateTimeControl } from '../controls/datetime.control';
import { PhotosControl } from '../controls/photos.control';

@Injectable()
export class ControlsService {
  getControls(descriptors: ControlDescriptor[]) {
    let controls = descriptors.map((descriptor, index) => {
      let options = {
        ...descriptor,
        type: descriptor.type,
        name: descriptor.name,
        label: descriptor.title,
        value: '',
        required: descriptor.required,
        order: descriptor.order
      };

      switch (descriptor.type) {
        case 'text':
        case 'number':
        case 'tel':
          return new TextboxControl(options);
        case 'textarea':
          return new TextareaControl(options);
        case 'select':
          return new SelectControl(options);
        case 'multiselect':
          return new MultiSelectControl(options);
        case 'range':
          return new RangeControl(options);
        case 'currency':
          return new CurrencyControl(options);
        case 'address':
          return new AddressControl(options);
        case 'date':
          return new DateControl(options);
        case 'time':
          return new TimeControl(options);
        case 'datetime':
          return new DateTimeControl(options);
        case 'photos':
          return new PhotosControl(options);
        default:
          console.error(`${descriptor.type} is not supported`);
      }
    });

    return controls.filter(x => !!x).sort((a, b) => a.order - b.order);
  }
}
