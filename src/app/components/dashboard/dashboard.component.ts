import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { AnalysisCardsComponent } from './analysis-cards/analysis-cards.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AnalysisCardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  isSidebarOpen: boolean = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isSidebarOpen$.subscribe((state) => {
      this.isSidebarOpen = state;
    });
  }
}
