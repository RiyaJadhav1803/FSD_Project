import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5050/api/v1';

  constructor(private http: HttpClient) {}

  
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  uploadFile(fileData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/upload`, fileData, { headers });
  }

  fetchDocuments(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/documents`, { headers });
  }

    getSummarizedDocuments(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${this.baseUrl}/summaries`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  sendSummary(data: any) {
    return this.http.post('http://localhost:5050/api/send-summary', data);
  }
  getReceivedMessages(email: string): Observable<any> {
    return this.http.get(`http://localhost:5050/api/get-messages/${email}`);
  }
  
  
  
}
