import { Component } from '@angular/core';
import { ProgressCardComponent } from '../../cards/progress-card/progress-card.component';
import { SkewShadowCardComponent } from '../../cards/skew-shadow-card/skew-shadow-card.component';
import { CurvesShadowCardComponent } from '../../cards/curves-shadow-card/curves-shadow-card.component';
import { BubbleShadowCardComponent } from '../../cards/bubble-shadow-card/bubble-shadow-card.component';

@Component({
  selector: 'app-analysis-cards',
  imports: [ProgressCardComponent, SkewShadowCardComponent, CurvesShadowCardComponent, BubbleShadowCardComponent],
  templateUrl: './analysis-cards.component.html',
  styleUrl: './analysis-cards.component.css'
})
export class AnalysisCardsComponent {

}
