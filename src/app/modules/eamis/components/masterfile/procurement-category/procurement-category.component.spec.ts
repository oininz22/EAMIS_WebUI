import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementCategoryComponent } from './procurement-category.component';

describe('ProcurementCategoryComponent', () => {
  let component: ProcurementCategoryComponent;
  let fixture: ComponentFixture<ProcurementCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
