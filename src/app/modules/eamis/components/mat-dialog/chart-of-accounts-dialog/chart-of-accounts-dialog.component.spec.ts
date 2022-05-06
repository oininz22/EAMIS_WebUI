import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountsDialogComponent } from './chart-of-accounts-dialog.component';

describe('ChartOfAccountsDialogComponent', () => {
  let component: ChartOfAccountsDialogComponent;
  let fixture: ComponentFixture<ChartOfAccountsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOfAccountsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOfAccountsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
