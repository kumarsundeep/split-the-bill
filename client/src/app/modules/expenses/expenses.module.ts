import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule
  ]
})
export class ExpensesModule { }
