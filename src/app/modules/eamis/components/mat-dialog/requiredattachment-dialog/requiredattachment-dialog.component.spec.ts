import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredattachmentDialogComponent } from './requiredattachment-dialog.component';

describe('RequiredattachmentDialogComponent', () => {
  let component: RequiredattachmentDialogComponent;
  let fixture: ComponentFixture<RequiredattachmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredattachmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredattachmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
