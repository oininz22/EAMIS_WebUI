import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitmeasureDialogComponent } from './unitmeasure-dialog.component';

describe('UnitmeasureDialogComponent', () => {
  let component: UnitmeasureDialogComponent;
  let fixture: ComponentFixture<UnitmeasureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitmeasureDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitmeasureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
