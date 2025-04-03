import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  signup() {
    this.apiService.signup({ name: this.name, email: this.email, password: this.password }).subscribe((response) => {
      alert('Signup successful');
      localStorage.setItem('email', response.email); 
      localStorage.setItem('email', this.email);
      this.router.navigate(['/login']);
    }, err => {
      
      alert('Signup failed');
    });
  }
}
