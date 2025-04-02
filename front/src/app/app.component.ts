import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';

  constructor(private router: Router) {}

  logout() {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
