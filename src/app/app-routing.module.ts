import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CurrentDayComponent} from "./components/current-day/current-day.component";
import {FutureDaysComponent} from "./components/future-days/future-days.component";

const routes: Routes = [
  {path: "", component: CurrentDayComponent},
  {path: "day/0", component: CurrentDayComponent},
  {path: "day/:dateIndex", component: FutureDaysComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
