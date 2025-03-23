import { Component, HostListener } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  imports: [LoginComponent, NavbarComponent, SidebarComponent, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isSidebarOpen: boolean = window.innerWidth >= 992;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth >= 992) {
      this.isSidebarOpen = true;
    }else{
      this.isSidebarOpen = false;
    }
  }
}
