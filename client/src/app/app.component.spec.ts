import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule.forRoot(routes)
      ],
      declarations: [
        AppComponent,
        PrimaryLayoutComponent
      ],
    }).compileComponents();
  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'client'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('client');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('client app is running!');
  // });
});

