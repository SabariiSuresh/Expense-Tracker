import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenceEditDaialodComponent } from './expence-edit-daialod.component';

describe('ExpenceEditDaialodComponent', () => {
  let component: ExpenceEditDaialodComponent;
  let fixture: ComponentFixture<ExpenceEditDaialodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenceEditDaialodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenceEditDaialodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
