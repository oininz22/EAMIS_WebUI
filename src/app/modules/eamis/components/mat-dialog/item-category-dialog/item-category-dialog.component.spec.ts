import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryDialogComponent } from './item-category-dialog.component';

describe('ItemCategoryDialogComponent', () => {
  let component: ItemCategoryDialogComponent;
  let fixture: ComponentFixture<ItemCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
