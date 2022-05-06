import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementCategoryDialogComponent } from './procurement-category-dialog.component';

describe('ProcurementCategoryDialogComponent', () => {
  let component: ProcurementCategoryDialogComponent;
  let fixture: ComponentFixture<ProcurementCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
