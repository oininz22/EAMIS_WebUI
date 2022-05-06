import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredattachmentModalComponent } from './requiredattachment-modal.component';

describe('RequiredattachmentModalComponent', () => {
  let component: RequiredattachmentModalComponent;
  let fixture: ComponentFixture<RequiredattachmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredattachmentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredattachmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
