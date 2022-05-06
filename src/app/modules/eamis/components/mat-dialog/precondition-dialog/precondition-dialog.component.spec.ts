import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreconditionDialogComponent } from './precondition-dialog.component';

describe('PreconditionDialogComponent', () => {
  let component: PreconditionDialogComponent;
  let fixture: ComponentFixture<PreconditionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreconditionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreconditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
