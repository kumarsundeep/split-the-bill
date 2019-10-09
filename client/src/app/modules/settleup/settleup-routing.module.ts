import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettleupComponent } from './settleup.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        component: SettleupComponent,
        data: {
          title: 'Settle Up'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettleupRoutingModule { }
