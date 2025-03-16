import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: false,
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  signup() {
    this.apiService.signup({ name: this.name, email: this.email, password: this.password }).subscribe(() => {
      alert('Signup successful');
      this.router.navigate(['/login']);
    }, err => {
      
      alert('Signup failed');
    });
  }
}
