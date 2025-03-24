import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{
  @Input() isSidebarOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
