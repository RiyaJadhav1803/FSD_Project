import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Import Router
import jsPDF from 'jspdf';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  standalone: false,
})
export class UploadComponent {
  file: File | null = null;
  userId: string = '';
  summary: string | null = null;

  constructor(private http: HttpClient, private router: Router) {} // ✅ Inject Router

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (!this.file || !this.userId) {
      alert('Please select a file and enter User ID.');
      return;
    }

    const authToken = localStorage.getItem('token');
    if (!authToken) {
      alert('No auth token found. Redirecting to login...');
      this.router.navigate(['/login']); // ✅ Now router works correctly
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('userId', this.userId);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    this.http.post('http://localhost:5050/api/v1/upload', formData, { headers })
      .subscribe(
        (response: any) => {
          this.summary = response.data; 
          console.log(this.summary); 
          alert('File uploaded and summarized successfully');
        },
        (error) => {
          console.error('File upload failed:', error);
          alert(error.error?.message || 'Failed to upload file');
        }
      );
  }

  exportToPDF() {
    if (!this.summary) {
      alert('No summary available to export.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Summarized Text', 10, 20);
    doc.setFontSize(12);
    const textLines = doc.splitTextToSize(this.summary, 180);
    doc.text(textLines, 10, 40);
    doc.save('summarized_text.pdf');
  }
}
