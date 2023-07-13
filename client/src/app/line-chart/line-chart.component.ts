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
  public chart: any;
  private chartInfo: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];

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
            backgroundColor: "rgba(0,0,0,1)",
            borderColor: "gba(0,0,0,1)"
          },
          {
            label: "Richtwert",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 50),
            fill: false,
            pointRadius: 0.1,
            borderColor: "limegreen",
            backgroundColor: "limegreen"
          },
          {
            label: "Toleranzbereich 'hoch'",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 50.02),
            fill: false,
            pointRadius: 0.1,
            borderColor: "orange",
            backgroundColor: "white",
            borderDash: [5]
          },
          {
            label: "Toleranzbereich 'niedrig'",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 49.98),
            fill: false,
            pointRadius: 0.1,
            borderColor: "orange",
            backgroundColor: "white",
            borderDash: [20, 5]
          },
          {
            label: "Einsatz negativer Regelenergie",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 50.2),
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(255, 99, 71)",
            backgroundColor: "white",
            borderDash: [5]
          },
          {
            label: "Einsatz positiver Regelenergie",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 49.8),
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(255, 99, 71)",
            backgroundColor: "white",
            borderDash: [20, 5]
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}
