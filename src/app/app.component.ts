import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, NavbarComponent, SidebarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
