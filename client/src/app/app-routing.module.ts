import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimaryLayoutComponent } from './shared/layout/primary-layout/primary-layout.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'main',
    },
    component: PrimaryLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './modules/main/main.module#MainModule'
      },
      {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule'
      },
      {
        path: 'expenses',
        loadChildren: './modules/expenses/expenses.module#ExpensesModule'
      },
      {
        path: 'settleup',
        loadChildren: './modules/settleup/settleup.module#SettleupModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
