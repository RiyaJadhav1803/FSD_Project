import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css',
  standalone: false,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login({ email: this.email, password: this.password }).subscribe(response => {
      localStorage.setItem('token', response.data);
      this.router.navigate(['/upload']);
    }, err => {
      alert('Login failed');
    });
  }
}
 