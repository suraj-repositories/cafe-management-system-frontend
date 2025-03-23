import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { AnalysisCardsComponent } from './analysis-cards/analysis-cards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AnalysisCardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  @Input() isSidebarOpen:boolean = false;

}
