import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleShadowCardComponent } from './bubble-shadow-card.component';

describe('BubbleShadowCardComponent', () => {
  let component: BubbleShadowCardComponent;
  let fixture: ComponentFixture<BubbleShadowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleShadowCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleShadowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
