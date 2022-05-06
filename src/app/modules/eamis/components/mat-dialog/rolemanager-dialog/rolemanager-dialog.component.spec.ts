import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemanagerDialogComponent } from './rolemanager-dialog.component';

describe('RolemanagerDialogComponent', () => {
  let component: RolemanagerDialogComponent;
  let fixture: ComponentFixture<RolemanagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolemanagerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemanagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
