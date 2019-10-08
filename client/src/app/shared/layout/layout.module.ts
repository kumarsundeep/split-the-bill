import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';



//components
import { PrimaryLayoutComponent } from './primary-layout/primary-layout.component';
import { PrimaryHeaderComponent } from './primary-header/primary-header.component';
import { PrimaryHeaderService } from './primary-header/primary-header.service';


@NgModule({
  declarations: [
    PrimaryLayoutComponent,
    PrimaryHeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  providers: [PrimaryHeaderService]
})
export class LayoutModule { }
