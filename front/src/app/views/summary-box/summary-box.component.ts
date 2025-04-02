
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

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
   documents: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSummarizedDocuments().subscribe(
      (response) => {
        this.documents = response.documents;
      },
      (error) => {
        console.error('Error fetching summaries:', error);
      }
    );
  }
}
