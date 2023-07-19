import { NumberSymbol } from '@angular/common';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs';
import { FrequencyType } from 'src/app/models/enums/frequency-type';
import { FrequencyCurrentService } from 'src/app/services/frequency-current/frequency-current.service';

@Component({
  selector: 'app-frequency-current',
  templateUrl: './frequency-current.component.html',
  styleUrls: ['./frequency-current.component.css']
})
export class FrequencyCurrentComponent implements OnInit {
  public popup: any = false;
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

  get getFrequencyInformation(): string {
    var direction: string
    var amount: string
    var explanation: string
    var text: string

    var frequencyType = this.determineFrequencyType(this.currentFrequency)

    switch(frequencyType) {
      case FrequencyType.balanced: {
        direction = "genau auf";
        amount = "ausreichend";
        explanation = "";
        break;
      }
      case FrequencyType.deadbandNegative: {
        direction = "über";
        amount = "zu viel";
        explanation = "";
        break;
      }
      case FrequencyType.negativeBalancing: {
        direction = "über";
        amount = "zu viel";
        explanation = "";
        break;
      }
      case FrequencyType.reduceSupply: {
        direction = "über";
        amount = "zu viel";
        explanation = "";
        break;
      }
      case FrequencyType.deadbandPositive: {
        direction = "unter";
        amount = "zu wenig";
        explanation = "";
        break;
      }
      case FrequencyType.positivBalancing: {
        direction = "unter";
        amount = "zu wenig";
        explanation = "";
        break;
      }
      case FrequencyType.increaseSupply: {
        direction = "unter";
        amount = "zu wenig";
        explanation = "";
        break;
      }
      default: {
        return "Fehler beim Abruf der Daten."
      }
    }
    
    text = `Die aktuelle Stromfrequenz liegt bei ${this.currentFrequency} Herz. Sie liegt damit ${direction} dem Richtwert von 50 Herz. Das bedeutet, dass von den Stromerzeugern ${amount} Strom ins Netz eingespeist wird. ${explanation}`
    return text
 }

  determineFrequencyType(value: number): FrequencyType|any {
    if (value == 50) {
      return FrequencyType.balanced
    } else if (value < 50 && value >= 49.08) {
      return FrequencyType.deadbandPositive
    } else if (value < 49.08 && value >= 49.8) {
      return FrequencyType.positivBalancing
    } else if (value < 49.8) {
      return FrequencyType.increaseSupply
    } else if (value > 50 && value < 50.02) {
      return FrequencyType.deadbandNegative
    } else if (value > 50.02 && value < 50.2) {
      return FrequencyType.positivBalancing
    } else if (value > 50.2) {
      return FrequencyType.reduceSupply
    }
    throwIfEmpty()
  }
}
