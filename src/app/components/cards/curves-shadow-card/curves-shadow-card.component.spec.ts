import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvesShadowCardComponent } from './curves-shadow-card.component';

describe('CurvesShadowCardComponent', () => {
  let component: CurvesShadowCardComponent;
  let fixture: ComponentFixture<CurvesShadowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurvesShadowCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurvesShadowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
