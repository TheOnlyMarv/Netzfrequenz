import { Component, OnInit } from '@angular/core';
import { FrequencyCurrentService } from 'src/app/services/frequency-current/frequency-current.service';

@Component({
  selector: 'app-frequency-current',
  templateUrl: './frequency-current.component.html',
  styleUrls: ['./frequency-current.component.css']
})
export class FrequencyCurrentComponent implements OnInit {
  public currentFrequency: any;

  constructor(public service: FrequencyCurrentService) {}

  ngOnInit(): void {
    this.service.getFrequencyCurrentInfo().subscribe((response) => {
      this.currentFrequency = response;
      console.log(response);
    })
  }

}
