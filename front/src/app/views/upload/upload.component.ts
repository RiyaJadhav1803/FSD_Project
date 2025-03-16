import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  standalone: false,
})
export class UploadComponent {
  file: File | null = null;
  userId: string = '';

  constructor(private http: HttpClient) {}

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
      alert('No auth token found. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('userid', this.userId);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    this.http.post('http://localhost:5050/api/v1/upload', formData, { headers })
      .subscribe(
        () => alert('File uploaded successfully'),
        (error) => {
          console.error('File upload failed:', error);
          alert('Failed to upload file');
        }
      );
  }
}
