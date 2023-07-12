import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from '../charts/chart.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  // constructor(private http: HttpClient) {}
  // readings: any;

  // ngOnInit(): void {
  //   this.http.get('https://localhost:5001/api/frequency').subscribe({
  //     next: response => this.readings = response,
  //     error: error => console.log(error),
  //     complete: () => console.log("Request has completed"),
  //   });
  //   this.createChart();
  // }
  public chart: any;
  private chartInfo: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];

  constructor(public service: ChartService) {}

  ngOnInit(): void {
    this.service.getFrequencyChartInfo().subscribe((response) => {
      this.chartInfo = response;
      console.log(response)
      if (this.chartInfo != null) {
        for (let i = 0; i < this.chartInfo.length; i++) {
          this.labeldata.push(this.chartInfo[i].timestamp);
          this.realdata.push(this.chartInfo[i].frequency);
        }
        this.createChart(this.labeldata, this.realdata);
      }
    });
  }
  createChart(labeldata: any, realdata: any){
    this.chart = new Chart("FrequencyChart", {
      type: 'line', 

      data: {
        labels: labeldata, 
         datasets: [
          {
            label: "Netzfrequenz",
            data: realdata,
            backgroundColor: "limegreen"
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}


  // createChart(labeldata: any, realdata: any, colordata: any){
  //   this.chart = new Chart("FrequencyChart", {
  //     type: 'line', 

  //     data: {// values on X-Axis
  //       labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
  //                '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
  //        datasets: [
  //         {
  //           label: "Netzfrequenz",
  //           data: ['542', '542', '536', '327', '17',
  //                  '0.00', '538', '541'],
  //           backgroundColor: 'limegreen'
  //         }  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }
  //   });
  // }