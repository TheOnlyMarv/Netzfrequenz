import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequencyChartComponent } from './pages/frequency-chart/frequency-chart.component';
import { FrequencyCurrentComponent } from './pages/frequency-current/frequency-current.component';

const routes: Routes = [
  {path: 'aktuell', component: FrequencyCurrentComponent},
  {path: 'verlauf', component: FrequencyChartComponent},
  {path: '**', component: FrequencyCurrentComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
