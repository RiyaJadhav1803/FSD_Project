import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-received-messages',
  standalone: false,
  templateUrl: './received-messages.component.html',
  styleUrl: './received-messages.component.css'
})
export class ReceivedMessagesComponent {
  messages: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const email = localStorage.getItem('email');
    if (email) {
      this.apiService.getReceivedMessages(email).subscribe(
        (response) => {
          this.messages = response;
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
    } else {
      console.error('User email not found in localStorage');
    }
  }

  downloadSummary(summary: string) {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  
}
