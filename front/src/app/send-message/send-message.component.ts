import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-message',
  standalone: false,
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent {
  summaryText: string = history.state.summary || "";
  recipientEmail: string = "";

  constructor(private apiService: ApiService, private router: Router) {}

  sendEmail() {
    const senderEmail = localStorage.getItem('email');  // Get the sender's email from localStorage
  
    if (!senderEmail) {
      alert('User not logged in');
      return;
    }
  
    const payload = {
      senderEmail: senderEmail,  // Include sender's email
      recipientEmail: this.recipientEmail,
      summary: this.summaryText,
    };
  
    this.apiService.sendSummary(payload).subscribe(
      (response) => {
        alert('Summary sent successfully!');
        this.router.navigate(['/summarizer']);
      },
      (error) => {
        alert('Failed to send summary.');
        console.error(error);
      }
    );
  }
  
}
