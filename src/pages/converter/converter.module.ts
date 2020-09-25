import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyConverter } from './converter';

@NgModule({
  declarations: [
    CurrencyConverter,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyConverter),
  ],
})
export class CurrencyConverterModule {}
