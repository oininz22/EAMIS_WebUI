import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreConditionsComponent } from './pre-conditions.component';

describe('PreConditionsComponent', () => {
  let component: PreConditionsComponent;
  let fixture: ComponentFixture<PreConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
