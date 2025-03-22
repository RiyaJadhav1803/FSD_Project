import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (!this.file) {
      alert('Please select a file and enter User ID.');
      return;
    }

    const authToken = localStorage.getItem('token');
    if (!authToken) {
      alert('No auth token found. Please log in.');
      return;
    } 

    const formData = new FormData();
    formData.append('file', this.file);
    // formData.append('userid', this.userId);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    this.http.post('http://localhost:5050/api/v1/upload', formData, { headers })
    .subscribe(
      (response: any) => {
        this.summary = response.data; 
        console.log(this.summary); 
         // Ensure backend sends this field
        alert('File uploaded and summarized successfully');
      },
      (error) => {
        console.error('File upload failed:', error);
        alert('Failed to upload file');
      }
    );
  }
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Summarized Text', 10, 20);
      doc.setFontSize(12);
      const textLines = doc.splitTextToSize(this.summary ?? '', 180);
      doc.text(textLines, 10, 40);
      doc.save('summarized_text.pdf');
    }
}
