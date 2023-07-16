import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FrequencyChartService } from '../../services/frequency-chart/frequency-chart.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-frequency-chart',
  templateUrl: './frequency-chart.component.html',
  styleUrls: ['./frequency-chart.component.css']
})
export class FrequencyChartComponent implements OnInit {
  public chart: any;
  private chartInfo: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];

  constructor(public service: FrequencyChartService) {}

  ngOnInit(): void {
    this.service.getFrequencyChartInfo().subscribe((response) => {
      this.chartInfo = response;
      console.log(response)
      if (this.chartInfo != null) {
        for (let i = 0; i < this.chartInfo.length; i++) {
          if (i === 0) {
            this.labeldata.push("jetzt");
          } else {
            var ts = formatDate(new Date(this.chartInfo[i].timestamp), "HH:mm:ss", "de-DE").toString();
            this.labeldata.push(ts);
          }
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
            backgroundColor: "rgba(0,0,0.7)",
            borderColor: "rgba(0,0,0,0.6)"
          },
          {
            label: "Richtwert",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 50),
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(50,205,50,0.8)",
            backgroundColor: "rgba(50,205,50,0.8)",
          },
          {
            label: "Toleranzbereich 'hoch'",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 50.02),
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(255,165,0,0.5)",
            backgroundColor: "rgb(251, 244, 226)",
            borderDash: [5]
          },
          {
            label: "Toleranzbereich 'niedrig'",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 49.98),
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(255,165,0,0.5)",
            backgroundColor: "rgb(251, 244, 226)",
            borderDash: [20, 5]
          },
          {
            label: "Einsatz negativer Regelenergie",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 50.2),
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(255,99,71,0.7)",
            backgroundColor: "rgb(251, 244, 226)",
            borderDash: [5]
          },
          {
            label: "Einsatz positiver Regelenergie",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 49.8),
            fill: false,
            pointRadius: 0.1,
            borderColor: "rgba(255,99,71,0.7)",
            backgroundColor: "rgb(251, 244, 226)",
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
