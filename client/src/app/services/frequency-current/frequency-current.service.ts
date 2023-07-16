import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrequencyCurrentService {
  
  constructor(private httpClient: HttpClient) {}

  getFrequencyCurrentInfo() {
    return this.httpClient.get("https://localhost:5001/api/frequency/update");
  }
}
