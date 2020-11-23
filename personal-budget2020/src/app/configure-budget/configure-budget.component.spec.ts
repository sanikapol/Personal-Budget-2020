import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureBudgetComponent } from './configure-budget.component';

describe('ConfigureBudgetComponent', () => {
  let component: ConfigureBudgetComponent;
  let fixture: ComponentFixture<ConfigureBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
