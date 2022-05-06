import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedPropertyComponent } from './received-property.component';

describe('ReceivedPropertyComponent', () => {
  let component: ReceivedPropertyComponent;
  let fixture: ComponentFixture<ReceivedPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
