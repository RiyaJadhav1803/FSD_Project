
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Summary {
  id: string;
  text: string;
  title?: string;
  timestamp?: Date;
}

@Component({
  selector: 'app-summary-box',
  standalone: false,
  templateUrl: './summary-box.component.html',
  styleUrls: ['./summary-box.component.css']
})
export class SummaryBoxComponent implements OnInit {
  summaries: Summary[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchSummaries();
  }

  fetchSummaries(): void {
    this.loading = true;
    this.error = null;
    
    // Update the URL to match your backend endpoint
    this.http.get<Summary[]>('/api/summaries')
      .subscribe({
        next: (data) => {
          this.summaries = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load summaries. Please try again later.';
          this.loading = false;
          console.error('Error fetching summaries:', err);
        }
      });
  }

  // Optional: Add method to delete a summary if needed
  deleteSummary(id: string): void {
    this.http.delete(`/api/summaries/${id}`)
      .subscribe({
        next: () => {
          this.summaries = this.summaries.filter(summary => summary.id !== id);
        },
        error: (err) => {
          console.error('Error deleting summary:', err);
        }
      });
  }
}
