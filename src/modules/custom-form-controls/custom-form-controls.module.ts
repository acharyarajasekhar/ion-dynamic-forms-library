import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { AddressControlComponent } from './components/address-control.component';
import { PostalAddressApiService } from './services/postal-address-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CacheModule } from 'ionic-cache';

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
    AddressControlComponent
  ],
  exports: [
    AddressControlComponent
  ],
  providers: [
    PostalAddressApiService
  ]
})
export class CustomFormControlsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomFormControlsModule,
      providers: [PostalAddressApiService]
    };
  }
}
