import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpieDialogComponent } from './dashboardpie-dialog.component';

describe('DashboardpieDialogComponent', () => {
  let component: DashboardpieDialogComponent;
  let fixture: ComponentFixture<DashboardpieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardpieDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardpieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
