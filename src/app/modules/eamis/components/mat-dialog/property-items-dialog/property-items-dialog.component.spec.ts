import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyItemsDialogComponent } from './property-items-dialog.component';

describe('PropertyItemsDialogComponent', () => {
  let component: PropertyItemsDialogComponent;
  let fixture: ComponentFixture<PropertyItemsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyItemsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyItemsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
