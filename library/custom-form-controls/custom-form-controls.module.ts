import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { AddressControlComponent } from './components/address-control/address-control.component';
import { PostalAddressApiService } from './services/postal-address-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CacheModule } from 'ionic-cache';
import { PhotosControlComponent } from './components/photos-control/photos-control.component';
import { IMAGE_PICKER_SERVICE, IImagePickerService, ImagePickerService } from './services/native-image-picker.service';

export interface CustomFormControlsModuleConfig {
  imagePickerService: Type<IImagePickerService>;
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CacheModule.forRoot({ keyPrefix: 'svn-app-cache-' }),
  ],
  declarations: [
    AddressControlComponent,
    PhotosControlComponent
  ],
  exports: [
    AddressControlComponent,
    PhotosControlComponent
  ],
  providers: [
    PostalAddressApiService,
    { provide: IMAGE_PICKER_SERVICE, useClass: ImagePickerService }
  ]
})
export class CustomFormControlsModule {
  static forRoot(config?: CustomFormControlsModuleConfig): ModuleWithProviders {
    return {
      ngModule: CustomFormControlsModule,
      providers: [
        PostalAddressApiService,
        { provide: IMAGE_PICKER_SERVICE, useClass: config && config.imagePickerService || ImagePickerService }
      ]
    };
  }
}
