import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisCardsComponent } from './analysis-cards.component';

describe('AnalysisCardsComponent', () => {
  let component: AnalysisCardsComponent;
  let fixture: ComponentFixture<AnalysisCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
