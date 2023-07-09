import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Aktuelle Netzfrequenz';
  readings: any;
  latest: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/frequency/latest').subscribe({
      next: response => this.latest = response,
      error: error => console.log(error),
      complete: () => console.log("Request has completed"),
    });
    this.http.get('https://localhost:5001/api/frequency').subscribe({
      next: response => this.readings = response,
      error: error => console.log(error),
      complete: () => console.log("Request has completed"),
    });
  }
}
