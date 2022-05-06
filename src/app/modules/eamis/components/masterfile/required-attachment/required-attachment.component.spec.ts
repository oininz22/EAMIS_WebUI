import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredAttachmentComponent } from './required-attachment.component';

describe('RequiredAttachmentComponent', () => {
  let component: RequiredAttachmentComponent;
  let fixture: ComponentFixture<RequiredAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
