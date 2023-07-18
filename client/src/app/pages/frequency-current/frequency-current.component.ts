import { Component, OnInit } from '@angular/core';
import { FrequencyCurrentService } from 'src/app/services/frequency-current/frequency-current.service';

@Component({
  selector: 'app-frequency-current',
  templateUrl: './frequency-current.component.html',
  styleUrls: ['./frequency-current.component.css']
})
export class FrequencyCurrentComponent implements OnInit {
  public currentFrequency: any;
  public errorMessage: string|undefined;
  constructor(public service: FrequencyCurrentService) {}

  ngOnInit(): void {
    this.service.getFrequencyCurrentInfo().subscribe((response) => {
      if (response == undefined)
      {
        this.errorMessage = "Fehler beim Abruf der Daten";
      } else {
        this.errorMessage = undefined;
        this.currentFrequency = response.Frequency;
      }
    })
  }
}
