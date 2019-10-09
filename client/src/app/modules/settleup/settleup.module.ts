import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettleupRoutingModule } from './settleup-routing.module';
import { SettleupComponent } from './settleup.component';


@NgModule({
  declarations: [SettleupComponent],
  imports: [
    CommonModule,
    SettleupRoutingModule
  ]
})
export class SettleupModule { }
