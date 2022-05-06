import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalAspectsDialogComponent } from './environmental-aspects-dialog.component';

describe('EnvironmentalAspectsDialogComponent', () => {
  let component: EnvironmentalAspectsDialogComponent;
  let fixture: ComponentFixture<EnvironmentalAspectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalAspectsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalAspectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
