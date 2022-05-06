import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalImpactsComponent } from './environmental-impacts.component';

describe('EnvironmentalImpactsComponent', () => {
  let component: EnvironmentalImpactsComponent;
  let fixture: ComponentFixture<EnvironmentalImpactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalImpactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
