import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLaoutComponent } from './dashboard-laout.component';

describe('DashboardLaoutComponent', () => {
  let component: DashboardLaoutComponent;
  let fixture: ComponentFixture<DashboardLaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLaoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
