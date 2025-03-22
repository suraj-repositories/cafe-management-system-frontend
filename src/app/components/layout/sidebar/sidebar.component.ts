import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  @Input() isSidebarOpen: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    console.log("Sidebar state changed:", this.isSidebarOpen);
  }
}
