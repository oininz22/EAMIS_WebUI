import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalAspectsComponent } from './environmental-aspects.component';

describe('EnvironmentalAspectsComponent', () => {
  let component: EnvironmentalAspectsComponent;
  let fixture: ComponentFixture<EnvironmentalAspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalAspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalAspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
