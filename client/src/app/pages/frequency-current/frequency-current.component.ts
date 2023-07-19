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
        explanation = "Es werden aktuell <b>keine Maßnahmen</b> getroffen.";
        break;
      }
      case FrequencyType.deadbandNegative: {
        direction = "über";
        amount = "zu viel";
        explanation = "Aktuell liegt der Wert im sogenannten <b>Totband</b>, innerhalb dessen <b>keine Maßnahmen</b> zur Ausbalancierung der Frequenz getroffen werden. Innerhalb dieser geringen Abweichung könnten Messfehler auftreten, weswegen sie ignoriert wird.";
        break;
      }
      case FrequencyType.negativeBalancing: {
        direction = "über";
        amount = "zu viel";
        explanation = "Um die <b>Überfrequenz</b> auszugleichen, wird nun automatisch die sogenannte <b>negative Regelleistung</b> aktiviert: Ausgewählte Stromerzeuger entziehen dem Netz Strom, indem sie den eigenen Verbrauch erhöhen, oder die eigene Einspeisung reduzieren.";
        break;
      }
      case FrequencyType.reduceSupply: {
        direction = "über";
        amount = "zu viel";
        explanation = "Die Überfrequenz ist aktuell so hoch, dass sie nicht mehr allein über die sogenannte Regelleistung ausbalanciert werden kann. Es werden nun zusätzlich Stromerzeuger wie Solaranlagen aufgerufen, weniger Strom als geplant in Netz einzuspeisen.";
        break;
      }
      case FrequencyType.deadbandPositive: {
        direction = "unter";
        amount = "zu wenig";
        explanation = "Aktuell liegt der Wert im sogenannten <b>Totband</b>, innerhalb dessen <b>keine Maßnahmen</b> zur Ausbalancierung der Frequenz getroffen werden. Innerhalb dieser geringen Abweichung könnten Messfehler auftreten, weswegen sie ignoriert wird.";
        break;
      }
      case FrequencyType.positivBalancing: {
        direction = "unter";
        amount = "zu wenig";
        explanation = "Um die <b>Unterfrequenz</b> auszugleichen, wird nun automatisch die sogenannte <b>positive Regelleistung</b> aktiviert: Ausgewählte Stromerzeuger speisen mehr Strom ins Netz ein oder reduzieren ihren Verbrauch.";
        break;
      }
      case FrequencyType.increaseSupply: {
        direction = "unter";
        amount = "zu wenig";
        explanation = "Die Frequenz ist aktuell sehr niedrig (<b>Unterfrequenz</b>), sodass sie nicht mehr allein über die sogenannte Regelleistung ausbalanciert werden kann. Es werden nun zusätzlich Leistungsreserven von Kraftwerken aktiviert.";
        break;
      }
      default: {
        return "Fehler beim Abruf der Daten."
      }
    }
    
    text = `Die aktuelle Stromfrequenz liegt bei <b>${this.currentFrequency}</b> Herz. Sie liegt damit <b>${direction}</b> dem Richtwert von 50 Herz. Das bedeutet, dass von den Stromerzeugern ${amount} Strom ins Netz eingespeist wird. Die tatsächliche Frequenz muss stets so nah wie möglich am Richtwert sein, um die Stabilität des Stromnetzes zu gewährleisten. Bei 50 Herz sind Nachfrage und Erzeugung im idealen Verhältnis: Der erzeugte Strom wird im selben Moment verbraucht.<br><br><h4>Balancierungsmaßnahmen</h4>${explanation}`
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
      return FrequencyType.negativeBalancing
    } else if (value > 50.2) {
      return FrequencyType.reduceSupply
    }
    throwIfEmpty()
  }
}
