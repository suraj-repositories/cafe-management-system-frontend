import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "cafe management system";

  constructor(private router: Router) {}

  ngOnInit() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token' && event.newValue === null) {
        this.router.navigate(['/login']);
      }
    });
  }
}
