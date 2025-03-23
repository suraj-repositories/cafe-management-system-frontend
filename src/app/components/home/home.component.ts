import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidebarOpen: boolean;

  constructor(private sidebarService: SidebarService) {
    this.isSidebarOpen = window.innerWidth >= 992;
    this.sidebarService.setSidebarState(this.isSidebarOpen);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.setSidebarState(this.isSidebarOpen);
  }
}
