
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
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
   summary: string | null = null;
   constructor(private apiService: ApiService, private router: Router) {}

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

  exportToPDF(summary: string) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Summarized Text', 10, 20);
    doc.setFontSize(12);
    const textLines = doc.splitTextToSize(summary, 180);
    doc.text(textLines, 10, 40);
    doc.save('summarized_text.pdf');
  }  
  sendSummary(summary: string) {
    this.router.navigate(['/sendmessage'], { state: { summary: summary } });
  }
}
