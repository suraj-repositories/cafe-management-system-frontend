import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkewShadowCardComponent } from './skew-shadow-card.component';

describe('SkewShadowCardComponent', () => {
  let component: SkewShadowCardComponent;
  let fixture: ComponentFixture<SkewShadowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkewShadowCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkewShadowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
