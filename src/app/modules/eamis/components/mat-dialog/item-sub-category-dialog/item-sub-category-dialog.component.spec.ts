import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubCategoryDialogComponent } from './item-sub-category-dialog.component';

describe('ItemSubCategoryDialogComponent', () => {
  let component: ItemSubCategoryDialogComponent;
  let fixture: ComponentFixture<ItemSubCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSubCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSubCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
