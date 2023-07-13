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
            backgroundColor: "rgba(0,0,0,1)"
          },
          {
            label: "Sollwert",
            data: Array.apply(null, realdata).map(Number.prototype.valueOf, 50),
            fill: false,
            pointRadius: 0.1,
            borderColor: "limegreen",
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
