import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrequencyChartService {

  constructor(private httpClient: HttpClient) {}

  getFrequencyChartInfo() {
    return this.httpClient.get("https://localhost:5001/api/frequency");
  }
}
