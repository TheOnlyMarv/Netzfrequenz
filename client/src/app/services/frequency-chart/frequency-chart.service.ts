import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FreqReadingDto } from 'src/app/models/freq-reading-dto';

@Injectable({
  providedIn: 'root'
})
export class FrequencyChartService {

  constructor(private httpClient: HttpClient) {}

  getFrequencyChartInfo(limit: number) : Observable<FreqReadingDto[]> {
    return this.httpClient.get<FreqReadingDto[]>(`https://localhost:5001/api/frequency?limit=${limit}`);
  }
}
