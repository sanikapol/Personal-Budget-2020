import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddbudgetComponent } from './addbudget/addbudget.component';
import { AppComponent } from './app.component';
import { ConfigureBudgetComponent } from './configure-budget/configure-budget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeletebudgetComponent } from './deletebudget/deletebudget.component';
import { EditbudgetComponent } from './editbudget/editbudget.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        ConfigureBudgetComponent,
        FooterComponent,
        HeroComponent,
        MenuComponent,
        LogoutComponent,
        EditbudgetComponent,
        DeletebudgetComponent,
        AddbudgetComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'personal-budget2020'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('personal-budget2020');
  });

});
