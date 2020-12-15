import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebudgetComponent } from './deletebudget.component';

describe('DeletebudgetComponent', () => {
  let component: DeletebudgetComponent;
  let fixture: ComponentFixture<DeletebudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletebudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletebudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
